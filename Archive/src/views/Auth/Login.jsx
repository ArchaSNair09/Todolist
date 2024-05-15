import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const Login = () => {
    const navigate = useNavigate();

    // formik initial values
    const initialValues = {
        username: "",
        password: ""
    };

    // formik validation schema
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
    });

    // handle login
    const doLogin = (values) => {
        // login api call comes here
        // api success: navigate to home screen
        // api fail: show alert 
        navigate('/');
    };

    return (
        <div className='flex items-center justify-center h-[calc(100vh-60px)]'>
            <div className="w-96 bg-base-100 shadow-xl rounded-lg p-10">
                <h2 className='text-2xl font-bold my-5'>Login</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            doLogin(values);
                        }, 400);
                    }}
                >
                    {(formikProps) => (
                        <form onSubmit={formikProps.handleSubmit}>
                            <TextInput
                                name="username"
                                label="Username"
                                error={formikProps.errors.username}
                                value={formikProps.values.username}
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
                            <Button type='submit' className='w-full' label='Login' />
                            <div className='flex justify-center gap-2 text-md'>
                                Don't have an account?
                                <Link to='/signup' className='underline text-blue-600'>Sign Up</Link>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;