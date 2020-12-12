import { useState, useCallback } from 'react'
import axios from '../axios-movies'

const useForm = (formObj) => {
    const [form, setForm] = useState(formObj)
    const renderFormInputs = () => {
        return Object.values(form).map((inputObj) => {
            const { value, label, errorMessage, valid, renderInput } = inputObj
            return renderInput(onInputChange, value, valid, errorMessage, label)
        })
    }

    const isInputFieldValid = useCallback(
        (inputField) => {
            for (const rule of inputField.validationRules) {
                if (!rule.validate(inputField.value, form)) {
                    inputField.errorMessage = rule.message
                    return false
                }
            }

            return true
        },
        [form]
    )

    const onInputChange = useCallback(
        (event) => {
            const { name, value } = event.target
            // copy input object whose value was changed
            const inputObj = { ...form[name] }
            // update value
            inputObj.value = value

            // update input field's validity
            const isValidInput = isInputFieldValid(inputObj)
            // if input is valid and it was previously set to invalid
            // set its valid status to true
            if (isValidInput && !inputObj.valid) {
                inputObj.valid = true
            } else if (!isValidInput && inputObj.valid) {
                // if input is not valid and it was previously valid
                // set its valid status to false
                inputObj.valid = false
            }

            // mark input field as touched
            inputObj.touched = true
            setForm({ ...form, [name]: inputObj })
            console.log(form)
        },
        [form, isInputFieldValid]
    )

    /**
     * returns boolean value indicating whether overall form is valid
     *
     * @param {object} formObj - object representation of a form
     */
    const isFormValid = useCallback(() => {
        let isValid = true
        const arr = Object.values(form)

        for (let i = 0; i < arr.length; i++) {
            if (!arr[i].valid) {
                isValid = false
                break
            }
        }

        return isValid
    }, [form])

    const signupFormHandler = (event) => {
        event.preventDefault()
        console.log(form)
        axios.post('/accounts.json', { name: form.name, email: form.email, password: form.password })
            .then((response) => {
                window.alert("sign up was successful")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const signinFormHandler = (event) => {
        event.preventDefault()

        axios.get('https://cinemagic99-default-rtdb.firebaseio.com/accounts.json')
            .then((response) => {
                console.log(form.email)
                for (let item in response.data) {
                    if (response.data[item].email.value === form.email.value) {
                        if (response.data[item].password.value === form.password.value) {
                            window.alert("Successful Login")
                        }
                    }
                    else window.alert("Login Failed")
                }
            }
            )
            .catch((error) => {
                console.log(error)
            })
    }

    return { renderFormInputs, isFormValid, signupFormHandler, signinFormHandler }
}

export default useForm