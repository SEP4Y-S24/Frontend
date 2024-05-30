import { Form, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import Heading from "../../../components/Elements/Headings/Heading";
import InputField from "../../../components/Form/InputField";
import Button from "../../../components/Elements/Button";
import * as z from 'zod';
import React, { useState } from "react";
import { useLogin } from "../../../lib/auth";
import { LoginPropsRequest } from "../types";
import SpinnerComponent from "../../spinner/SpinnerComponent";
import { useNavigate } from "react-router";
import PopUp from "../../../components/Elements/PopUp/PopUp";
import {ERROR_HANDLING} from "./AuthenticationConstants";


const schema = z.object({
    email: z.string().min(1, ERROR_HANDLING.EMAIL_REQUIRED).email(ERROR_HANDLING.INVALID_EMAIL_FORMAT),
    password: z.string().min(1, ERROR_HANDLING.INVALID_PASSWORD_FORMAT),
});

export const Login = () => {
    const login = useLogin();
    const [values, setValues] = useState<LoginPropsRequest>({ email: '', password: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            schema.parse(values);
            const request: LoginPropsRequest = {
                email: values.email,
                password: values.password
            }
            login.mutate(request, {
                onSuccess: () => {
                    navigate('/');
                },
                onError: (error) => {
                    // @ts-ignore
                    setPopupMessage(error);
                    setShowPopup(true);
                    setIsSubmitting(false);
                }
            });
        } catch (error) {
            let displayedError:string = '';
            setIsSubmitting(false);
            if (error instanceof z.ZodError) {
                const fieldErrors: { [key: string]: string } = {};
                error.errors.forEach(err => {
                    const path = err.path.join('.');
                    fieldErrors[path] = err.message;
                    displayedError = err.message;
                });
                setErrors(fieldErrors);
                setPopupMessage(displayedError);
                setShowPopup(true); // Show PopUp with validation errors
            }
        }
    };
    return (
        <Layout>
            <Form onSubmit={handleSubmit}>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <Heading text={"Sign in to your account"} type={"heading1"} className={"text-center"} />
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div>
                            <InputField type={"email"} id={"email"} labelText={"Email address"} name={"email"} onChange={handleChange}/>
                        </div>
                        <div>
                            <InputField type={"password"} id={"password"} labelText={"Password"} name={"password"} onChange={handleChange}/>
                        </div>

                        <div className={"pt-5"}>
                            {isSubmitting ? (
                                <SpinnerComponent />
                            ) : (
                                <Button text={"Sign in"} styleType={"info"} className={"w-full justify-center"} type="submit" />
                            )}
                        </div>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <Link to={'/auth/register'} className={"text-primaryColor"}>Register a new account here!</Link>
                        </p>
                    </div>
                </div>
            </Form>

            {showPopup && (
                <PopUp
                    title="Error"
                    textAlert={popupMessage}
                    type="danger"
                    buttonCancelText="Close"
                    onCancel={() => setShowPopup(false)} // Close PopUp on cancel
                />
            )}
        </Layout>
    );
};