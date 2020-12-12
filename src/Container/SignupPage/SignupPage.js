import React from 'react'
import useForm from '../../Hooks/useForm'
import { signupForm } from '../../Components/FormConfig/formConfig'
import "./SignupPage.css"

const SignupForm = (props) => {
    const { renderFormInputs, isFormValid, signupFormHandler } = useForm(signupForm)


    return (
        <form className="signupForm">
            <h1>Sign Up</h1>
            {renderFormInputs()}
            <button type="submit" disabled={!isFormValid()} onClick={signupFormHandler}>
                Submit
            </button>
        </form >
    )
}

export default SignupForm