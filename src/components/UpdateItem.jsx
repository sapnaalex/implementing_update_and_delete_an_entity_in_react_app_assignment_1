import React, { useState, useEffect } from "react";

const UpdateItem = ({ itemId }) => {
  const API_URI = `http://localhost:5000/doors/${itemId}`; 
  const [item, setItem] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URI);
        if (!response.ok) throw new Error("Failed to fetch item");
        const data = await response.json();
        setItem(data);
        setUpdatedValue(data.name || ""); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [API_URI]);

  return (
    <div>
      <h2>Update Item</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {item && (
        <div>
          <p>Current Name: {item.name}</p>
          <input
            type="text"
            value={updatedValue}
            onChange={(e) => setUpdatedValue(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateItem;