import React, { useState, useEffect } from "react";
import { Alert, Table } from "react-bootstrap";

const Users = () => {
  const [userData, setUserData] = useState();
  const [mode, setMode] = useState("online");
  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setUserData(result);
        localStorage.setItem("users", JSON.stringify(result));
      })
      .catch((e) => {
        setMode("offline");
        let offlinedata = localStorage.getItem("users");
        setUserData(JSON.parse(offlinedata));
      });
  }, []);

  return (
    <div>
      <div>
        {mode === "offline" ? (
          <Alert key="warning" variant="warning">
            No Internet
          </Alert>
        ) : (
          ""
        )}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email ID</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
export default Users;
