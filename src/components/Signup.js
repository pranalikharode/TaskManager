import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success){
      //save the auth token and redirect
      localStorage.setItem('token',json.authtoken)
      history("/")
      props.showAlert("Account created successfully","success");

  }
  else{
    props.showAlert("Invalid credentials","danger");
  }
  };

  /**
   * Update State: setCredentials({ ...credentials, [e.target.name]: e.target.value })

setCredentials is a function that updates the credentials state.
{ ...credentials } creates a copy of the current credentials state.
[e.target.name]: e.target.value updates the property in the copied state that matches the name of the input field with its new value.
The spread operator (...) ensures that all other properties in the credentials state remain unchanged.
   *
   */

 // Handle form input changes
const onChange = (e) => {
  // Update the state with the new value of the input field
  setCredentials({
    ...credentials,  // Copy the existing state
    [e.target.name]: e.target.value  // Update the property that matches the input field's name
  });
};


  return (
    <div className="container mt-2">
      <h2 className="my-1">Create an account to save your notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="cpassword"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;

    