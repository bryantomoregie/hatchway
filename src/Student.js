import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./styles/students.css";

const sumArrayOfString = (arrayOfStrings) => {
  const length = arrayOfStrings.length;
  const ints = [];
  arrayOfStrings.forEach((element) => ints.push(parseInt(element)));
  const sum = ints.reduce((a, b) => a + b);
  return sum / length;
};

export const Student = ({
  city,
  company,
  email,
  firstName,
  grades,
  lastName,
  pic,
  skill,
  students,
  setStudents,
}) => {
  const [open, setOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    setTagInput(event.target.value);
  };

  const enterKeyPressed = (event) => {
    if (event.key === "Enter") {
      console.log(students);
    }
  };

  return (
    <div className="studentContainer">
      <div className="avatar">
        <img src={pic} alt="avatar" />
      </div>
      <div className="informationContainer">
        <h1>{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</h1>
        <p>{`Email: ${email}`}</p>
        <p>{`Company: ${company}`}</p>
        <p>{`Skill: ${skill}`}</p>
        <p>{`Average: ${sumArrayOfString(grades)}%`}</p>
        <ul style={{ display: open ? "block" : "none" }}>
          <li>{`Test 1: \u00A0 \u00A0 ${grades[0]}%`}</li>
          <li>{`Test 2: \u00A0 \u00A0 ${grades[1]}%`}</li>
          <li>{`Test 3: \u00A0 \u00A0 ${grades[2]}%`}</li>
          <li>{`Test 4: \u00A0 \u00A0 ${grades[3]}%`}</li>
          <li>{`Test 5: \u00A0 \u00A0 ${grades[4]}%`}</li>
          <li>{`Test 6: \u00A0 \u00A0 ${grades[5]}%`}</li>
          <li>{`Test 7: \u00A0 \u00A0 ${grades[6]}%`}</li>
          <li>{`Test 8: \u00A0 \u00A0 ${grades[7]}%`}</li>
        </ul>
        <input
          value={tagInput}
          onChange={handleChange}
          onKeyPress={enterKeyPressed}
          className="addInput"
          placeholder="Add a tag"
        />
      </div>
      <FontAwesomeIcon
        onClick={() => handleClick()}
        className="icon"
        icon={open ? faPlus : faMinus}
        size="2x"
      />
    </div>
  );
};
