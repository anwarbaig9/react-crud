import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Read() {
  const [datas, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <div className="container mt-4">
      <h2>Reading the User Data</h2>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Name: {datas.name}</h4>
          <h4 className="card-subtitle mb-2 text-muted">
            Username: {datas.username}
          </h4>
          <h4>Email: {datas.email}</h4>
          <Link to="/" className="btn btn-primary mr-2">
            Back
          </Link>
          <Link to={`/update/${id}`} className="btn btn-info">
            Update
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Read;
