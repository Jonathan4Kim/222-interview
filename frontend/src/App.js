import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState(null);
    const [itemId, setItemId] = useState("1");

    useEffect(() => {
        // Fetch data on initial load or when itemId changes
        axios.get(`http://127.0.0.1:5000/api/data/${itemId}`)
            .then(response => setData(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, [itemId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = { item_id: itemId, additionalInfo: "extra data" };
        
        axios.post('http://127.0.0.1:5000/api/data', newData)
            .then(response => console.log("Post response:", response.data))
            .catch(error => console.error("Error posting data:", error));
    };

    return (
        <div>
            <h1>Dynamic Data Fetcher</h1>
            <input
                type="text"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                placeholder="Enter Item ID"
            />
            <button onClick={handleSubmit}>Send Data</button>

            <div>
                {data ? (
                    <>
                        <h2>Item ID: {data.item_id}</h2>
                        <p>Name: {data.name}</p>
                        <p>Description: {data.description}</p>
                        <p>Price: ${data.price}</p>
                    </>
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
        </div>
    );
}

export default App;
