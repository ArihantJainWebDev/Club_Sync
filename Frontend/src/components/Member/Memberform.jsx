import { useState } from "react";
import { addMember, updateMember } from "../../api";
import './Membercomp.css'

const Memberform = ({ member, refresh, closeForm }) => {
  const [formData, setFormData] = useState(
    member || { name: "", email: "", score: 0 }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (member && member._id) {  // Ensure _id exists for update
      await updateMember(member._id, formData);
    } else {
      await addMember(formData);
    }
    refresh();
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} className="member-form">
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="number" name="score" placeholder="Score" value={formData.score} onChange={handleChange} />
      <button type="submit">{member ? "Update" : "Add"} Member</button>
      <button type="button" onClick={closeForm}>Cancel</button>
    </form>
  );
};

export default Memberform;
