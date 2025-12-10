export default function DisplayForm({ collection, attributes, data }) {
    return (
        <div className="form-card">
            <h2>Display {collection}</h2>
            <table>
                <thead>
                    <tr>
                        {attributes.map(attr => <th key={attr}>{attr}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data[collection]?.map((item, i) => (
                        <tr key={i}>
                            {attributes.map(attr => <td key={attr}>{item[attr]}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
