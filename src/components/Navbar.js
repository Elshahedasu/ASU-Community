import { Link } from "react-router-dom";

export default function Navbar({ selectedCollection, setSelectedCollection, collections }) {
    return (
        <nav className="navbar">
            <div className="logo">CRUD App</div>
            <ul className="nav-links">
                <li><Link to="/insert">Insert</Link></li>
                <li><Link to="/update">Update</Link></li>
                <li><Link to="/delete">Delete</Link></li>
                <li><Link to="/display">Display</Link></li>
            </ul>
            <div className="collection-select">
                <label>Collection: </label>
                <select value={selectedCollection} onChange={e => setSelectedCollection(e.target.value)}>
                    {collections.map(col => <option key={col} value={col}>{col}</option>)}
                </select>
            </div>
        </nav>
    );
}
