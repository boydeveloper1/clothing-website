import { useState, FormEvent, ChangeEvent } from "react";

import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input-component";

import Button from "../button/button.component";

// Importing the function to create a new user from firebase utlis
// import {
//   createAuthUserWithEmailAndPassword,
//   createUserDocumentFromAuth,
// } from "../../utils/firebase/firebase.utils";

import { SignUpContainer } from "./sign-up-form.styles";
import { signUpStart } from "../../store/user/user.action";

// Creating the default state
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Handling the submit of a form
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      // creating a user with the email and password
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error as Error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign Up with Your Email and Password </span>
      {/* Handle submit triggers after the form has been submitted  */}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          type="text"
          id="name"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          required
          type="email"
          id="email"
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          required
          type="password"
          id="password"
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          required
          type="password"
          id="cpassword"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignupForm;
