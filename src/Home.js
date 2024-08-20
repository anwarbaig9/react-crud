import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [da, setDa] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => {
        setDa(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3001/users/${id}`)
        .then(() => {
          // After successful deletion, remove the user from the state
          setDa(da.filter((user) => user.id !== id));
          // Optionally navigate or refresh the page
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container mt-4">
      <div>
        <Link to="/create" className="btn btn-primary">
          Add User
        </Link>
      </div>
      <h1 className="text-center mb-4">List of Users</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {da.map((d, id) => (
            <tr key={id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.username}</td>
              <td>{d.email}</td>
              <td style={{ display: "flex", gap: "5px" }}>
                <Link to={`/update/${d.id}`} className="btn btn-primary">
                  Update
                </Link>
                <Link to={`/read/${d.id}`} className="btn btn-success">
                  Read
                </Link>
                <button
                  onClick={() => handleDelete(d.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
