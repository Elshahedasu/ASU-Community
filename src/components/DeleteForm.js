import { useState } from "react";

export default function DeleteForm({ collection, data, setData }) {
    const [id, setId] = useState("");

    const handleDelete = () => {
        if (!data[collection]) return;
        setData({
            ...data,
            [collection]: data[collection].filter(item => item._id !== id)
        });
        setId("");
    };

    return (
        <div className="form-card">
            <h2>Delete from {collection}</h2>
            <input type="text" placeholder="_id" value={id} onChange={e => setId(e.target.value)} />
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
    );
}
