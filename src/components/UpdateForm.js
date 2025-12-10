import { useState } from "react";

export default function UpdateForm({ collection, attributes, data, setData }) {
    const [form, setForm] = useState({});

    const handleUpdate = () => {
        setData({
            ...data,
            [collection]: data[collection].map(item => item._id === form._id ? { ...item, ...form } : item)
        });
        const emptyForm = {};
        attributes.forEach(attr => emptyForm[attr] = "");
        setForm(emptyForm);
    };

    return (
        <div className="form-card">
            <h2>Update {collection}</h2>
            <input type="text" placeholder="_id" value={form._id || ""} onChange={e => setForm({ ...form, _id: e.target.value })} />
            {attributes.map(attr => attr !== "_id" && (
                <input key={attr} type="text" placeholder={attr} value={form[attr] || ""} onChange={e => setForm({ ...form, [attr]: e.target.value })} />
            ))}
            <button className="update-btn" onClick={handleUpdate}>Update</button>
        </div>
    );
}
