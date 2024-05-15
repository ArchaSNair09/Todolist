import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const Signup = () => {
    const navigate = useNavigate();

    // min 6 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    // formik initial values
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    // formik validation schema
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(1, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .matches(passwordRegExp, { message: "Create a password with a minimum of 6 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 numeric digit." })
            .required("Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), ""], "Passwords must match")
            .required("Required"),
    });

    // handle register
    const doSignup = (values) => {
        // registration api call comes here
        // api success: navigate to login screen
        // api fail: show alert 
        navigate('/login');
    };

    return (
        <div className='flex items-center justify-center h-[calc(100vh-60px)]'>
            <div className="w-96 bg-base-100 shadow-xl rounded-lg p-10">
                <h2 className='text-2xl font-bold my-5'>Register</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            doSignup(values);
                        }, 400);
                    }}
                >
                    {(formikProps) => (
                        <form onSubmit={formikProps.handleSubmit}>
                            <TextInput
                                name="name"
                                label="Name"
                                error={formikProps.errors.name}
                                value={formikProps.values.name}
                                onChange={formikProps.setFieldValue}
                            />
                            <TextInput
                                name="email"
                                label="Email"
                                error={formikProps.errors.email}
                                value={formikProps.values.email}
                                onChange={formikProps.setFieldValue}
                            />
                            <TextInput
                                type='password'
                                name="password"
                                label="Password"
                                error={formikProps.errors.password}
                                value={formikProps.values.password}
                                onChange={formikProps.setFieldValue}
                            />
                            <TextInput
                                type='password'
                                name="confirmPassword"
                                label="Confirm Password"
                                error={formikProps.errors.confirmPassword}
                                value={formikProps.values.confirmPassword}
                                onChange={formikProps.setFieldValue}
                            />
                            <Button type='submit' className='w-full' label='Signup' />
                            <div className='flex justify-center gap-2 text-md'>
                                Already have an account?
                                <Link to='/login' className='underline text-blue-600'>Sign in</Link>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Signup;