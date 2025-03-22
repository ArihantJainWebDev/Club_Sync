from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import motor.motor_asyncio
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all frontend origins (Change to specific domains in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

# MongoDB connection
MONGO_URI = "mongodb://localhost:27017"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client["clubsync"]
announcements_collection = db["announcements"]

# Collections
clubs_collection = db.clubs
users_collection = db.users
events_collection = db.events
members_collection = db.members
# ---------------- CLUB MANAGEMENT ----------------

clubs = {}

class Club(BaseModel):
    club_name: str
    description: str

class JoinClubRequest(BaseModel):
    username: str
    club_name: str

@app.post("/create-club")
async def create_club(club: Club):
    if club.club_name in clubs:
        raise HTTPException(status_code=400, detail="Club already exists!")
    
    clubs[club.club_name] = {"description": club.description, "members": []}
    return {"message": "Club created successfully!"}

@app.post("/join-club")
async def join_club(request: JoinClubRequest):
    if request.club_name not in clubs:
        raise HTTPException(status_code=404, detail="Club not found!")

    if request.username in clubs[request.club_name]["members"]:
        raise HTTPException(status_code=400, detail="User already joined!")

    clubs[request.club_name]["members"].append(request.username)
    return {"message": f"{request.username} joined {request.club_name} successfully!"}

@app.get("/clubs")
async def get_clubs():
    return {"clubs": clubs}

# ---------------- EVENT MANAGEMENT ----------------

class Event(BaseModel):
    event_name: str
    description: str
    score_value: int
    location: str
    participants: list = []

@app.post("/create-event/")
async def create_event(event: Event):
    existing_event = await events_collection.find_one({"event_name": event.event_name})
    if existing_event:
        raise HTTPException(status_code=400, detail="Event already exists")

    event_data = event.dict()
    event_data["participants"] = []  # Ensure it's always an array
    await events_collection.insert_one(event_data)

    return {"message": f"Event '{event.event_name}' created successfully"}

class JoinEventRequest(BaseModel):
    username: str
    event_name: str

@app.post("/join-event/")
async def join_event(request: JoinEventRequest):
    event = await events_collection.find_one({"event_name": request.event_name})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # Ensure 'participants' exists and is a list
    if "participants" not in event or not isinstance(event["participants"], list):
        event["participants"] = []

    if request.username in event["participants"]:
        raise HTTPException(status_code=400, detail="User already joined")

    await events_collection.update_one(
        {"event_name": request.event_name},
        {"$push": {"participants": request.username}}
    )

    user = await users_collection.find_one({"username": request.username})
    score_value = event.get("score_value", 0)  # Avoid KeyError

    if not user:
        await users_collection.insert_one({"username": request.username, "score": score_value})
    else:
        await users_collection.update_one(
            {"username": request.username},
            {"$inc": {"score": score_value}}
        )

    return {"message": f"{request.username} joined event '{request.event_name}' and earned {score_value} points"}

@app.get("/events/")
async def get_events():
    events = []
    async for event in events_collection.find():
        event["_id"] = str(event["_id"])
        events.append(event)
    return {"events": events}
# ---------------- LEADERBOARD ----------------

@app.get("/leaderboard/")
async def get_leaderboard():
    users = users_collection.find().sort("score", -1)
    leaderboard = []
    async for user in users:
        leaderboard.append({"username": user["username"], "score": user["score"]})
    return {"leaderboard": leaderboard}

# ---------------- MEMBER MANAGEMENT ----------------

class Member(BaseModel):
    name: str
    email: str
    score: int = 0

def member_serializer(member) -> dict:
    return {
        "id": str(member["_id"]),
        "name": member["name"],
        "email": member["email"],
        "score": member["score"],
    }

# Add a New Member
@app.post("/members/")
async def add_member(member: Member):
    new_member = await members_collection.insert_one(member.dict())
    created_member = await members_collection.find_one({"_id": new_member.inserted_id})
    return member_serializer(created_member)

# Get All Members
@app.get("/members/")
async def get_members():
    members = await members_collection.find().to_list(100)
    return {"members": [member_serializer(member) for member in members]}

# Edit Member by ID
@app.put("/members/{id}")
async def edit_member(id: str, member: Member):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid Member ID")

    updated_member = await members_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": member.dict()},
        return_document=True
    )

    if not updated_member:
        raise HTTPException(status_code=404, detail="Member not found")

    return member_serializer(updated_member)

# Delete Member by ID
@app.delete("/members/{id}")
async def delete_member(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid Member ID")

    deleted_member = await members_collection.find_one_and_delete({"_id": ObjectId(id)})
    
    if not deleted_member:
        raise HTTPException(status_code=404, detail="Member not found")

    return {"message": "Member deleted successfully"}

# Announcement Model
class Announcement(BaseModel):
    title: str
    content: str
    club_name: str
    created_by: str 

# Serializer Function
def announcement_serializer(announcement) -> dict:
    return {
        "id": str(announcement["_id"]),
        "title": announcement["title"],
        "content": announcement["content"],
        "club_name": announcement["club_name"],
        "created_by": announcement["created_by"]
    }

# Create Announcement
@app.post("/announcements/")
async def create_announcement(announcement: Announcement):
    announcement_data = announcement.dict()
    result = await announcements_collection.insert_one(announcement_data)
    return {"message": "Announcement created successfully", "id": str(result.inserted_id)}

# Get All Announcements
@app.get("/announcements/")
async def get_announcements():
    announcements = []
    async for announcement in announcements_collection.find():
        announcements.append(announcement_serializer(announcement))
    return {"announcements": announcements}

# Get Announcement by ID
@app.get("/announcements/{id}")
async def get_announcement(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid Announcement ID")

    announcement = await announcements_collection.find_one({"_id": ObjectId(id)})
    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")

    return announcement_serializer(announcement)

# Edit Announcement
@app.put("/announcements/{id}")
async def edit_announcement(id: str, announcement: Announcement):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid Announcement ID")

    updated_announcement = await announcements_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": announcement.dict()},
        return_document=True
    )

    if not updated_announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")

    return announcement_serializer(updated_announcement)

# Delete Announcement
@app.delete("/announcements/{id}")
async def delete_announcement(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid Announcement ID")

    deleted_announcement = await announcements_collection.find_one_and_delete({"_id": ObjectId(id)})
    
    if not deleted_announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")

    return {"message": "Announcement deleted successfully"}