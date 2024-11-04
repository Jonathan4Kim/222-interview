import React, { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState('');
    const dynamicPart = 'example'; // This can be dynamic from user input

    useEffect(() => {
      fetch(`/api/data/${dynamicPart}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [dynamicPart]);

    return (
      <div>
        <h1>Data from Flask: {data}</h1>
      </div>
    );
  }


export default App;
