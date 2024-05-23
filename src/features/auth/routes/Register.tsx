import {Form, Link} from 'react-router-dom';
import {Layout} from '../components/Layout';
import * as z from "zod";
import React, {useEffect, useState} from "react";
import Heading from "../../../components/Elements/Headings/Heading";
import InputField from "../../../components/Form/InputField";
import Button from "../../../components/Elements/Button";
import {EmblaOptionsType} from "embla-carousel";
import EmblaCarousel from "../../../components/Elements/Carousel/Carousel";
import {fetchPokemon, Pokemon} from "../../avatarPic/api";
import {useRegister} from "../../../lib/auth";
import storage from "../../../utils/storage";
import {useQuery} from "@tanstack/react-query";
import SpinnerComponent from "../../spinner/SpinnerComponent";
import {CreateUserPropsRequest} from "../types";
import {useNavigate} from "react-router";




const schema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format. Please insert valid email.'),
    password: z.string().min(1, 'Password needs to be at least 5 characters long.'),
    name: z.string().min(1, 'Name is required.')
});

type RegisterValues = {
    email: string;
    password: string;
    name: string;
    avatarId: string;
};
const OPTIONS: EmblaOptionsType = {align: 'start'}
const SLIDE_COUNT = 6
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export const Register = () => {
    //for register form
    const [values, setValues] = useState<RegisterValues>({email: '', password: '', name: '', avatarId: '1'});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [pokemonError, setPokemonError] = useState<string>('');


    //for pokemon image slider
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const handlePokemonSelect = (pokemonId: string) => {
        handleChange({target: {name: 'avatarId', value: pokemonId}} as React.ChangeEvent<HTMLInputElement>)
    };
    const navigate = useNavigate();

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
        const {name, value} = e.target;
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: ''});
    };
    const register = useRegister();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            schema.parse(values);
            const avatarIdNumber = parseInt(values.avatarId);
            const credentials: CreateUserPropsRequest = {
                email: values.email,
                password: values.password,
                name: values.name,
                avatarId: avatarIdNumber
            };
            register.mutate(credentials);
            navigate('/')
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
                            <InputField type={"text"} id={"name"} labelText={"Name"} name={"name"}
                                        onChange={handleChange}
                                        error={errors.name}/>
                        </div>
                        <div>
                            <InputField type={"email"} id={"email"} labelText={"Email address"} name={"email"}
                                        onChange={handleChange}
                                        error={errors.email}/>
                        </div>
                        <div>
                            <InputField type={"password"} id={"password"} labelText={"Password"} name={"password"}
                                        onChange={handleChange}
                                        error={errors.password}/>
                        </div>
                        <label
                            className="block my-2 text-base font-normal text-dark"> Choose your avatar:
                        </label>
                        {isLoading && <SpinnerComponent/>}
                        {error && <p className={"text-red-500"}>{"Error loading pokemons"}</p>}
                        {data && <EmblaCarousel data={pokemonList} slides={SLIDES} options={OPTIONS}
                                                                                 onSelect={handlePokemonSelect}/>   }

                        <div className={"pt-5"}>
                            <Button text={"Register"} styleType={"info"} className={"w-full justify-center"}
                                    type="submit"/>
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
