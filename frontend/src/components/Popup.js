import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

const Popup = ({ setShowPopup, popupContent, setUpdateUI, id }) => {
  const [name, setName] = useState(popupContent.student.name);
  const [age, setAge] = useState(popupContent.student.age);
  const [studentClass, setStudentClass] = useState(
    popupContent.student.studentClass
  );
  const [phonenumber, setPhonenumber] = useState(
    popupContent.student.phonenumber
  );
  const updateStudent = () => {
    const student = { name, age, studentClass, phonenumber };
    console.log(student);
    axios
      .put(`http://localhost:8080/student/update/${id}`, student)
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setShowPopup(false);
      });
  };
  return (
    <div className="backdrop">
      <div className="popup">
        <RxCross1 className="cross" onClick={() => setShowPopup(false)} />
        <h1>Update Student</h1>
        <div className="popup__input_holder">
          <form className="input_holder" noValidate autoComplete="off">
            <input
              id="outlined-basic"
              placeholder="Student Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              id="outlined-basic"
              placeholder="Student Age"
              variant="outlined"
              fullWidth
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              id="outlined-basic"
              placeholder="
            Student Class"
              variant="outlined"
              fullWidth
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
            />
            <input
              id="outlined-basic"
              placeholder="Phone Number"
              variant="outlined"
              fullWidth
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            <button onClick={updateStudent}>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;
