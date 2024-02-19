import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [url, setUrl] = useState('http://localhost:3000/data');
  const [api, setApi] = useState([]);
  const [situation, setSituation] = useState('');
  const [condition, setCondition] = useState(null);

  useEffect(() => {
    // Use async function inside useEffect for better error handling
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setApi(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function
  }, [situation, url]); // Include 'url' as a dependency if you intend to change it

  // Use arrow function to avoid immediate invocation
  const deleteItem = (parameter) => {
    axios.delete(`${url}/${parameter}`)
      .then(() => {
        setApi((info) => info.filter((value) => value.id !== parameter));
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  const editItem = (id) => {
    setCondition(id);
  };

  const saveItem = () => {
    // Implement the logic to save the edited item
    // You can make a PUT or PATCH request to update the item on the server
    // After saving, reset the condition to null to exit the edit mode
    setCondition(null);
  };

  return (
    <div>
      <table border={2} cellPadding={10}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Year</th>
            <th>Action</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {api.map((value, index) => (
            <tr key={value.id}>
              <td>{index + 1}</td>
              <td>{value.name}</td>
              <td>{value.year}</td>
              <td>
                <button onClick={() => deleteItem(value.id)}>delete</button>
              </td>
              <td>
                {value.id === condition ? (
                  <button onClick={saveItem}>save</button>
                ) : (
                  <button onClick={() => editItem(value.id)}>edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
