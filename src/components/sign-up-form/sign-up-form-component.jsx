import { useState } from "react"

import FormInput from "../form-input/form-input-component";

import Button from "../button/button.component";

// Importing the function to create a new user from firebase utlis
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss"

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

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    // Handling the submit of a form 
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match")
            return;
        }

        try {
            // creating a user with the email and password 
            const { user } = await createAuthUserWithEmailAndPassword(email, password)

            // creating a dosument in firebase with the user 
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use");
            } else {
                console.log("user creation encountered an error", error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with Your Email and Password </span>
            {/* Handle submit triggers after the form has been submitted  */}
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" required type="text" id="name" onChange={handleChange} name="displayName" value={displayName} />

                <FormInput label="Email" required type="email" id="email" onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" required type="password" id="password" onChange={handleChange} name="password" value={password} />

                <FormInput label="Confirm Password" required type="password" id="cpassword" onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <Button type="submit">Sign up</Button>

            </form>
        </div >
    )
}

export default SignupForm;