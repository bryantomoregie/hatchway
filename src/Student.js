import React from "react";
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
}) => {
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
      </div>
    </div>
  );
};
