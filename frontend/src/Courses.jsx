import { useState, useEffect } from 'react';
import './App.css';
const apiUrl = import.meta.env.VITE_API_URL;
function Courses() {
  const [courses, setCourses] = useState([]);
  const [err, setError] = useState('');
  async function fetchData() {
    const response = await fetch(`${apiUrl}/api/1.0/courses`);
    console.log(response.status);
    if (response.status !== 200) {
      setError('Something went wrong, try to troubleshoot the issue');
      return;
    }
    const data = await response.json();
    console.log(data);
    setCourses(data.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (err) {
    return <h2>{err}</h2>;
  }

  return (
    <>
      <ol role="list">
        {courses.map((course, index) => (
          <li key={index}>
            <h2>
              <a href={course.url} target="_target">
                {course.name}
              </a>
            </h2>
          </li>
        ))}
      </ol>
    </>
  );
}

export default Courses;
