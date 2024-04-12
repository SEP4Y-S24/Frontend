import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';


export const Register = () => {
    const navigate = useNavigate();

    return (
        <Layout title="Register your account">
            <p>login form</p>
        </Layout>
    );
};
