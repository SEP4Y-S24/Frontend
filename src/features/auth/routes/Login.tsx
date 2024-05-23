
import {Form, Link} from 'react-router-dom';
import { Layout } from '../components/Layout';
import Heading from "../../../components/Elements/Headings/Heading";
import InputField from "../../../components/Form/InputField";
import Button from "../../../components/Elements/Button";
import * as z from 'zod';
import React, {useState} from "react";
import {useLogin} from "../../../lib/auth";
import {hashPassword} from "./index";
import {LoginPropsRequest} from "../types";


const schema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format. Please insert valid email.'),
    password: z.string().min(1, 'Password is required'),
});


export const Login = () => {
    const login = useLogin();
    const [values, setValues] = useState<LoginPropsRequest>({ email: '', password: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            schema.parse(values);
            values.password = await hashPassword(values.password);
            login.mutate(values);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: { [key: string]: string } = {};
                error.errors.forEach(err => {
                    const path = err.path.join('.');
                    fieldErrors[path] = err.message;
                });
                setErrors(fieldErrors);
            }
        }
    };


    return (
        <Layout>

            <Form onSubmit={handleSubmit}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Heading text={"Sign in to your account"} type={"heading1"} className={"text-center"}/>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div>
                            <InputField type={"email"} id={"email"} labelText={"Email address"}  name={"email"} onChange={handleChange}
                                        error={errors.email}/>
                        </div>
                        <div>
                            <InputField type={"password"} id={"password"} labelText={"Password"}  name={"password"}  onChange={handleChange}
                                        error={errors.password}/>
                            </div>

                        <div className={"pt-5"}>
                            <Button text={"Sign in"} styleType={"info"} className={"w-full justify-center"} type="submit"/>
                        </div>


                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to={'/auth/register'} className={"text-primaryColor"}>Register a new account here!</Link>
                    </p>
                </div>
            </div>
            </Form>
        </Layout>
    );
};
