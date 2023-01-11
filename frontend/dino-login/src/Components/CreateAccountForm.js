import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { submitUser } from "../Networking.js";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function CreateAccountForm(props) {
  const { changeUser } = props;
  const navigate = useNavigate();
  const [usernameExists, setUsernameExists] = useState(false);

  function validate(values) {
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    }
    if (values.username.length > 20) {
      errors.username = "Username can have a maximum of 20 characters";
    }

    if (!values.password) {
      errors.password = "Required";
    }
    if (values.password.length > 20) {
      errors.password = "Password can have a maximum of 20 characters";
    }

    if (!values.repassword) {
      errors.repassword = "Required";
    }
    if (values.password !== values.repassword) {
      console.log("here");
      errors.repassword = "Passwords must match";
    }

    return errors;
  }

  const { handleSubmit, handleChange, handleBlur, touched, errors } = useFormik(
    {
      initialValues: {
        username: "",
        password: "",
        repassword: "",
      },
      validate,
      onSubmit: async (values) => {
        const response = await submitUser(values.username, values.password);
        if (response.code === 200) {
          (() => changeUser(values.username))();
          navigate("/game");
        } else if (response.code === 304) {
          setUsernameExists(true);
        }
      },
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="username"
        name="username"
        label="username"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.username && errors.username ? (
        <div className="errorMessage">{errors.username}</div>
      ) : null}

      <TextField
        id="password"
        name="password"
        label="password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.password && errors.password ? (
        <div className="errorMessage">{errors.password}</div>
      ) : null}

      <TextField
        id="repassword"
        name="confirm password"
        label="confirm password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.repassword && errors.repassword ? (
        <div className="errorMessage">{errors.repassword}</div>
      ) : null}

      <Button variant="contained" type="submit">
        Submit
      </Button>

      {usernameExists ? (
        <p className="errorMessage">
          Username already exists. Please try a different username
        </p>
      ) : null}
    </form>
  );
}
