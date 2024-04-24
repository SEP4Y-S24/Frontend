import {Form, Link, useNavigate} from 'react-router-dom';

import { Layout } from '../components/Layout';
import * as z from "zod";
import React, {useState} from "react";
import Heading from "../../../components/Elements/Headings/Heading";
import InputField from "../../../components/Form/InputField";
import Button from "../../../components/Elements/Button";


const schema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format. Please insert valid email.'),
    password: z.string().min(1, 'Password needs to be at least 5 characters long.'),
    name: z.string().min(1, 'Name is required.')
});
type RegisterValues = {
    email: string;
    password: string;
    name: string;
};

export const Register = () => {
    const [values, setValues] = useState<RegisterValues>({ email: '', password: '', name: '' });
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
            // If validation passes, proceed with form submission
            console.log('Form register submitted:', values);
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
                        <Heading text={"Register a new account"} type={"heading1"} className={"text-center"}/>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div>
                            <InputField type={"text"} id={"name"} labelText={"Name"}  name={"name"} onChange={handleChange}
                                        error={errors.name}/>
                        </div>
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
                            Already a member?{' '}
                            <Link to={'/auth/login'} className={"text-primaryColor"}>Log in to your account here!</Link>
                        </p>
                    </div>
                </div>
            </Form>
        </Layout>
    );
};
