import { useState, useEffect } from 'react';
import './App.css';
const apiUrl = import.meta.env.VITE_API_URL;
function App() {
  const [certifications, setCertifications] = useState([]);
  async function fetchData() {
    const response = await fetch(`${apiUrl}/api/1.0/certifications`);
    const data = await response.json();
    console.log(data);
    setCertifications(data.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ol role="list">
        {certifications.map((certification, index) => (
          <li
            style={{ '--i': index }}
            key={certification.code}
            className={certification.level}
          >
            <h3 className={certification.level}>
              <div className={'clearfix'}>
                <img src={certification.image}></img>
                <p>{certification.title}</p>
              </div>
            </h3>
            <p>{certification.description}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

export default App;
