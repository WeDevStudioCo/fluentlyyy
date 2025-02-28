import { useState, useEffect } from "react";
import axios from "axios";

const TeacherProfile = () => {
    const [calendlyLink, setCalendlyLink] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("/api/user") // Fetch logged-in user's data
            .then(response => setCalendlyLink(response.data.calendly_link || ""))
            .catch(error => console.error(error));
    }, []);

    const handleSave = () => {
        axios.post("/api/update-calendly", { calendly_link: calendlyLink })
            .then(response => setMessage(response.data.message))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Teacher Profile</h2>
            <label>Calendly Booking Link:</label>
            <input
                type="url"
                value={calendlyLink}
                onChange={(e) => setCalendlyLink(e.target.value)}
                placeholder="https://calendly.com/yourname"
            />
            <button onClick={handleSave}>Save</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TeacherProfile;