import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Student } from "./Student";
import { Search } from "./Search";
import Fuse from "fuse.js";
import "./styles/app.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

  const fuse = new Fuse(students, {
    keys: ["firstName", "lastName"],
  });

  const results = fuse.search("ing");

  console.log(results);

  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students")
      .then((response) => response.json())
      .then((data) => setStudents(data.students));
  }, []);

  const filterByName = useCallback(
    (copyOfStudentArray) => {
      const lowerCaseName = name.toLowerCase();

      const filterWithCaps = copyOfStudentArray.filter((student) => {
        const lowerCaseFN = student.firstName.toLowerCase();
        const lowerCaseLN = student.lastName.toLowerCase();

        return (
          lowerCaseFN.includes(lowerCaseName) ||
          lowerCaseLN.includes(lowerCaseName)
        );
      });

      return filterWithCaps;
    },
    [name]
  );

  const filterByTag = useCallback(
    (copyOfStudentArray) => {
      const filterWithCaps = copyOfStudentArray.filter((student) => {
        if (!student.tags) {
          return false;
        }

        let boolean = false;
        student.tags.forEach((studentTag) => {
          if (studentTag.includes(tag)) {
            boolean = true;
          }
        });

        return boolean;
      });

      return filterWithCaps;
    },
    [tag]
  );

  const filteredStudents = useMemo(() => {
    let copyOfStudentArray = students;

    if (name === "" && tag === "") {
      return copyOfStudentArray;
    }

    let uniqueNameFilter = filterByName(copyOfStudentArray);
    let uniqueTagFilter = filterByTag(copyOfStudentArray);

    if (!tag.length) {
      return uniqueNameFilter;
    }

    const filteredArray = uniqueNameFilter.filter((value) =>
      uniqueTagFilter.includes(value)
    );

    return filteredArray;
  }, [students, name, tag, filterByName, filterByTag]);

  return (
    <div className="container">
      <Search name={name} setName={setName} tag={tag} setTag={setTag} />
      <div>
        {filteredStudents.map((student) => (
          <Student
            key={student.id}
            {...student}
            students={students}
            setStudents={setStudents}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
