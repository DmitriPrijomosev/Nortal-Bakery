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

  useEffect(() => {
    if (localStorage.getItem("employees") === null) {
      console.log("LocalStorage massiiv tyhi");
      fetch(employeesURL)
        .then((res) => res.json())
        .then((json) => {
          setEmployees(json.data);
        });
      
    } else {
      setEmployees(JSON.parse(localStorage.getItem("employees")));
    }
  }, []);

  const addEmployee = () => {
    // TODO: Add validations
    // TODO: Add an employee to the table

    let [firstName, lastName] = nameRef.current.value.split(' ');
   

  };

  const deleteEmployee = (index) => {
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    setEmployees(employees.slice());
  }

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
              <tr>
                <td>{element.id}</td>
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
            {/* <tr>
              <td>123</td>
              <td>Added name 1</td>
              <td>email@email.com</td>
              <td>avatar</td>
              <td>
                <Button type="button" variant="danger">
                  Delete
                </Button>
              </td>
            </tr> */}
            {/* <tr>
              <td>124</td>
              <td>Added name 2</td>
              <td>email2@email.com</td>
              <td>avatar</td>
              <td>
                <Button type="button" variant="danger">
                  Delete
                </Button>
              </td>
            </tr> */}

            <tr className="input-row">
              <td>
                <input
                  type="text"
                  placeholder="ID"
                  className="form-control"
                  ref={idRef}
                  // required
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  ref={nameRef}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control"
                  ref={emailRef}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Avatar (url)"
                  className="form-control"
                  ref={avatarRef}
                  required
                />
              </td>
              <td>
                <Button
                  type="submit"
                  variant="success"
                  onClick={() => addEmployee()}
                >
                  Add
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Employees;
