import { Form, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import * as z from "zod";
import React, { useEffect, useState } from "react";
import Heading from "../../../components/Elements/Headings/Heading";
import InputField from "../../../components/Form/InputField";
import Button from "../../../components/Elements/Button";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "../../../components/Elements/Carousel/Carousel";
import { fetchPokemon, Pokemon } from "../../avatarPic/api";
import { useRegister } from "../../../lib/auth";
import storage from "../../../utils/storage";
import { useQuery } from "@tanstack/react-query";
import SpinnerComponent from "../../spinner/SpinnerComponent";
import { CreateUserPropsRequest } from "../types";
import { useNavigate } from "react-router";
import PopUp from "../../../components/Elements/PopUp/PopUp";
import {ERROR_HANDLING} from "./AuthenticationConstants";

const schema = z.object({
    email: z.string().min(1, ERROR_HANDLING.INVALID_EMAIL_FORMAT),
    password: z.string().min(1, ERROR_HANDLING.INVALID_PASSWORD_FORMAT),
    name: z.string().min(1, ERROR_HANDLING.INVALID_NAME_FORMAT),
});

type RegisterValues = {
    email: string;
    password: string;
    name: string;
    avatarId: string;
};

const OPTIONS: EmblaOptionsType = { align: 'start' }
const SLIDE_COUNT = 6
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export const Register = () => {
    const [values, setValues] = useState<RegisterValues>({ email: '', password: '', name: '', avatarId: '1' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false); // State to manage PopUp visibility
    const [popupMessage, setPopupMessage] = useState(""); // State to manage PopUp message
    const [pokemonError, setPokemonError] = useState<string>('');
    const [emailsList, setEmailsList] = useState<string[]>([]);
    const navigate = useNavigate();

    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const handlePokemonSelect = (pokemonId: string) => {
        handleChange({ target: { name: 'avatarId', value: pokemonId } } as React.ChangeEvent<HTMLInputElement>)
    };

    const { isLoading, error, data } = useQuery({
        queryKey: ['pokemonList'],
        queryFn: fetchPokemon,
    });

    useEffect(() => {
        if (data) {
            setPokemonList(data);
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const register = useRegister();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            schema.parse(values);

            if (emailsList.includes(values.email)) {
                setErrors({ ...errors, email: ERROR_HANDLING.EMAIL_TAKEN });
                setPopupMessage(ERROR_HANDLING.EMAIL_TAKEN);
                setShowPopup(true); // Show PopUp with error message
                setIsSubmitting(false);
                return;
            }

            const avatarIdNumber = parseInt(values.avatarId);
            const credentials: CreateUserPropsRequest = {
                email: values.email,
                password: values.password,
                name: values.name,
                avatarId: avatarIdNumber
            };
            register.mutate(credentials, {
                onSuccess: () => {
                    navigate('/');
                },
                onError: (error) => {
                    // @ts-ignore
                    setPopupMessage(error);
                    setShowPopup(true); // Show PopUp with error message
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
                        <Heading text={"Register a new account"} type={"heading1"} className={"text-center"} />
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div>
                            <InputField type={"text"} id={"name"} labelText={"Name"} name={"name"} onChange={handleChange} />
                        </div>
                        <div>
                            <InputField type={"email"} id={"email"} labelText={"Email address"} name={"email"} onChange={handleChange}/>
                        </div>
                        <div>
                            <InputField type={"password"} id={"password"} labelText={"Password"} name={"password"} onChange={handleChange}/>
                        </div>
                        <label className="block my-2 text-base font-normal text-dark"> Choose your avatar:</label>
                        {isLoading && <SpinnerComponent />}
                        {error && <p className={"text-red-500"}>{ERROR_HANDLING.FAIL_LOADING_POKEMONS}</p>}
                        {data && <EmblaCarousel data={pokemonList} slides={SLIDES} options={OPTIONS} onSelect={handlePokemonSelect} />}

                        <div className={"pt-5"}>
                            {isSubmitting ? (
                                <SpinnerComponent />
                            ) : (
                                <Button text={"Register"} styleType={"info"} className={"w-full justify-center"} type="submit" />
                            )}
                        </div>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already a member?{' '}
                            <Link to={'/auth/login'} className={"text-primaryColor"}>Log in to your account here!</Link>
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
