import { Button, Table } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";

function Employees() {
  // TODO: Load data from backend service
  const employeesURL = "https://reqres.in/api/users";
  const [employees, setEmployees] = useState([]);
  const idRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const avatarRef = useRef();
  const [idUnique, setIdUnique] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("data") === null) {
      fetch(employeesURL)
        .then((res) => res.json())
        .then((json) => {
          setEmployees(json.data);
        });
    } else {
      setEmployees(JSON.parse(localStorage.getItem("data")));
    }
  }, []);

  const addEmployee = () => {
    if (idRef.current.value === "") {
      setMessage("ID field empty or incorrect! Please use numbers only!");
      return;
    }
    if (nameRef.current.value === "") {
      setMessage("Field Name is empty");
      return;
    }
    if (emailRef.current.value === "") {
      setMessage("Email address is not entered");
      return;
    }
    
    if (avatarRef.current.value === "") {
      setMessage("Image not attached!");
      return;
    }
    setMessage("");
    let [firstName, lastName] = nameRef.current.value.split(" ");

    employees.push({
      id: Number(idRef.current.value),
      email: emailRef.current.value,
      first_name: firstName,
      last_name: lastName,
      avatar: avatarRef.current.value,
    });
    setEmployees(employees.slice());
    localStorage.setItem("data", JSON.stringify(employees));
  };

  const deleteEmployee = (index) => {
    employees.splice(index, 1);
    setEmployees(employees.slice());
    localStorage.setItem("data", JSON.stringify(employees));
  };

  const checkId = () => {
    const index = employees.findIndex(
      (element) => Number(element.id) === Number(idRef.current.value)
    );
    if (index === -1) {
      setIdUnique(true);
      setMessage("");
    } else {
      setIdUnique(false);
      setMessage("ID is not unique!");
    }
  };

  return (
    <div>
      <div className="container">
        <h2 className="mb-4">Employees</h2>
        <Table className="table table-hover table-bordered table-sortable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Avatar</th>
              {/* <!-- TODO: Add a column for an avatar --> */}
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((element, index) => (
              <tr key={index}>
                <td key={index}>{element.id}</td>
                <td>
                  {element.first_name} {element.last_name}
                </td>
                <td>{element.email}</td>
                <td>
                  <img src={element.avatar} alt=""></img>
                </td>
                <td>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => deleteEmployee(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

            <tr className="input-row">
              <td>
                <input
                  type="number"
                  placeholder="ID"
                  className="form-control"
                  onChange={checkId}
                  ref={idRef}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  ref={nameRef}
                />
              </td>
              <td>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  ref={emailRef}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Avatar (url)"
                  className="form-control"
                  ref={avatarRef}
                />
              </td>
              <td>
                <Button
                  type="submit"
                  variant="success"
                  disabled={idUnique === false}
                  onClick={() => addEmployee()}
                >
                  Add
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <div>{message}</div>
      </div>
    </div>
  );
}

export default Employees;
