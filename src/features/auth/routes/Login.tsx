
import {Link} from 'react-router-dom';
import { Layout } from '../components/Layout';
import Heading from "../../../components/Elements/Headings/Heading";
import InputField from "../../../components/Form/InputField";
import Button from "../../../components/Elements/Button";
import {Simulate} from "react-dom/test-utils";
import {useState} from "react";


export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        console.log(formData);
    };


    //const navigate = useNavigate();

    return (
        <Layout>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Heading text={"Sign in to your account"} type={"heading1"} className={"text-center"}/>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                        <div>
                            <InputField type={"email"} id={"email"} labelText={"Email address"} isRequired={true} name={"email"} onChange={handleInputChange}/>
                        </div>

                        <div>
                            <InputField type={"password"} id={"password"} labelText={"Password"} isRequired={true} name={"password"} onChange={handleInputChange}/>
                            </div>

                        <div className={"pt-5"}>
                            <Button text={"Sign in"} type={"info"} className={"w-full justify-center"} onClick={()=>handleSubmit()}/>
                        </div>


                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to={'/auth/register'} className={"text-primaryColor"}>Register a new account here!</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};
