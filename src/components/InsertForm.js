import { useState } from "react";

export default function InsertForm({ collection, attributes, data, setData }) {
    const [form, setForm] = useState({});

    const handleInsert = () => {
        if (!data[collection]) data[collection] = [];
        setData({
            ...data,
            [collection]: [...data[collection], { _id: Date.now().toString(), ...form }]
        });
        const emptyForm = {};
        attributes.forEach(attr => emptyForm[attr] = "");
        setForm(emptyForm);
    };

    return (
        <div className="form-card">
            <h2>Insert into {collection}</h2>
            {attributes.map(attr => attr !== "_id" && (
                <input
                    key={attr}
                    type="text"
                    placeholder={attr}
                    value={form[attr] || ""}
                    onChange={e => setForm({ ...form, [attr]: e.target.value })}
                />
            ))}
            <button className="insert-btn" onClick={handleInsert}>Insert</button>
        </div>
    );
}
