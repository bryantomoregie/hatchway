import React, { useEffect, useState } from "react";
import { Student } from "./Student";
import { Search } from "./Search";
import "./styles/app.css";

const App = () => {
  let [students, setStudents] = useState([]);
  let originalStudents;
  const [name, setName] = useState();
  const [tag, setTag] = useState();

  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students")
      .then((response) => response.json())
      .then((data) => setStudents(data.students));
    originalStudents = students;
  }, []);

  console.log(originalStudents, students);

  useEffect(() => {
    setStudents(
      students.slice().filter((student) => {
        return student.firstName.includes(name);
      })
    );
  }, [name]);

  return (
    <div className="container">
      <Search name={name} setName={setName} tag={tag} setTag={setTag} />
      <div>
        {students.map((student) => (
          <Student key={student.id} {...student} />
        ))}
      </div>
    </div>
  );
};

export default App;
