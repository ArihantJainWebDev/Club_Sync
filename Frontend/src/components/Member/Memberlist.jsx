import { useEffect, useState } from "react";
import { fetchMembers, deleteMember } from "../../api";
import Memberform from "./Memberform";
import './membercomp.css';

const Memberlist = () => {
    const [members, setMembers] = useState([]);
    const [editingMember, setEditingMember] = useState(null);

    const loadMembers = async () => {
        const data = await fetchMembers();
        setMembers(data);
    };

    useEffect(() => {
        loadMembers();
    }, []);

    const handleDelete = async (id) => {
        await deleteMember(id);
        loadMembers();
    };

    return (
        <div className="memberlist">
            <h2>Members List</h2>
            <button onClick={() => setEditingMember({})}>+ Add Member</button>

            <div className="member-details">
                {editingMember && (
                    <Memberform
                        member={editingMember}
                        refresh={loadMembers}
                        closeForm={() => setEditingMember(null)}
                    />
                )}
                <ul>
                    {members.map((member) => (
                        <li key={member._id}>
                            <div className="members">
                                <div className="members-info">
                                    {member.name} ({member.email}) - Score: {member.score}
                                </div>
                                <div className="members-btns">
                                    <button onClick={() => setEditingMember(member)}>Edit</button>
                                    <button onClick={() => handleDelete(member._id || member.id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Memberlist;
