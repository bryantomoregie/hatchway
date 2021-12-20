import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Student } from "./Student";
import { Search } from "./Search";
import Fuse from "fuse.js";
import "./styles/app.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

  const fuseName = new Fuse(students, {
    keys: ["firstName", "lastName"],
  });

  const fuseTag = new Fuse(students, {
    keys: ["tags"],
    includeScore: true,
  });

  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students")
      .then((response) => response.json())
      .then((data) => setStudents(data.students));
  }, []);

  const filterByName = useCallback(() => {
    const results = fuseName.search(name);
    return results;
  }, [name]);

  const filterByTag = useCallback(() => {
    const results = fuseTag.search(tag);
    return results;
  }, [tag]);

  const filteredStudents = useMemo(() => {
    if (name === "" && tag === "") {
      return null;
    }

    let uniqueNameFilter = filterByName();

    let uniqueTagFilter = filterByTag();

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
