import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "./Popup";

export default function Student() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [students, setStudents] = useState([]);
  const [updateUI, setUpadateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [id, setId] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, age, studentClass, phonenumber };
    console.log(student);
    fetch("http://localhost:8080/student/add", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("new student added!!!");
      alert("new student added seccessfully!!!");
      setName("");
      setAge("");
      setStudentClass("");
      setPhonenumber("");
      setUpadateUI((prevState) => !prevState);
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/student/getallstudents")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
        console.log(result);
      });
  }, [updateUI]);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8080/student/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        alert("student deleted seccessfully!!!");
        setUpadateUI((prevState) => !prevState);
      });
  };
  const handleUpdate = async (student) => {
    setPopupContent({ student });
    setShowPopup(true);
    setId(student.id);
    console.log(student.id);
  };

  return (
    <div>
      <div className="addcontainer">
        <h1
          style={{ fontFamily: "cursive", textAlign: "center", color: "black" }}
        >
          Add Student
        </h1>
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

          <button variant="contained" color="blue" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
      <div>
        <h1
          style={{ fontFamily: "cursive", textAlign: "center", color: "black" }}
        >
          Students
        </h1>

        <table className="center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Class</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border">
                <td className="border p-2">{student.id}</td>
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.age}</td>
                <td className="border p-2">{student.studentClass}</td>
                <td className="border p-2">{student.phonenumber}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(student)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpadateUI}
          id={id}
        />
      )}
    </div>
  );
}
