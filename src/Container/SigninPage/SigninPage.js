
import React from 'react'
import './SigninPage.css'
import useForm from '../../Hooks/useForm'
import { signinForm } from '../../Components/FormConfig/formConfig'

const SigninPage = () => {
    const { renderFormInputs, isFormValid, signinFormHandler } = useForm(signinForm)

    return (
        <div className="signin-form">
            <h1>Sign In</h1>
            {renderFormInputs()}
            <button type="submit" disabled={!isFormValid()} onClick={signinFormHandler}>
                Login
            </button>
        </div>
    )
}

export default SigninPage
