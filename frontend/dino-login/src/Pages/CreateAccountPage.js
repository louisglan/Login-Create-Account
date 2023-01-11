import CreateAccountForm from "../Components/CreateAccountForm.js";
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function CreateAccountPage(props) {
  const { changeUser } = props;
  return (
    <div>
      <h1>Create Account</h1>
      <CreateAccountForm changeUser={changeUser} />
      <p>Already have an account?</p>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button variant="contained">Log in</Button>
      </Link>
    </div>
  );
}
