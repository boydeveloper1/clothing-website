import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input-component";

import { AuthError, AuthErrorCodes } from "firebase/auth";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

// Importing the function to create a new user from firebase utlis
// import {
//   signInWithGooglePopup,
//   createUserDocumentFromAuth,
//   signInAuthUserWithEmailAndPassword,
// } from "../../utils/firebase/firebase.utils";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

// Creating the default state
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  // Handling the submit of a form
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));

      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD) {
        alert("incorrect password entered");
      } else if ((error as AuthError).code === AuthErrorCodes.USER_DELETED) {
        alert("no user associated with this email");
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with Your Email and Password </span>
      {/* Handle submit triggers after the form has been submitted  */}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
