
import {Link} from 'react-router-dom';
import { Layout } from '../components/Layout';
import Button from "../../../components/Elements/Button";


export const Login = () => {
    //const navigate = useNavigate();

    return (
        <Layout title="Log in to your account">
            <p>login form</p>
            <Link to={'/auth/register'}> no account</Link>
        </Layout>
    );
};
