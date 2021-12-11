import React, { useEffect, useState, useMemo } from "react";
import { Student } from "./Student";
import { Search } from "./Search";
import "./styles/app.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [tag, setTag] = useState();

  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students")
      .then((response) => response.json())
      .then((data) => setStudents(data.students));
  }, []);

  console.log(students);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const filteredStudents = useMemo(() => {
    let copyOfStudentArray = students;

    if (name === "") {
      return copyOfStudentArray;
    }

    const capName = capitalizeFirstLetter(name);

    const filterWithCaps = copyOfStudentArray.filter((student) => {
      return student.firstName.includes(capName);
    });

    const filterWithoutCaps = copyOfStudentArray.filter((student) => {
      return student.firstName.includes(name);
    });

    const arrayConcat = filterWithCaps.concat(filterWithoutCaps);

    let uniqueFilter = arrayConcat.filter((c, index) => {
      //come back to this
      return arrayConcat.indexOf(c) === index;
    });

    return uniqueFilter;
  }, [students, name]);

  return (
    <div className="container">
      <Search name={name} setName={setName} tag={tag} setTag={setTag} />
      <div>
        {filteredStudents.map((student) => (
          <Student key={student.id} {...student} />
        ))}
      </div>
    </div>
  );
};

export default App;
