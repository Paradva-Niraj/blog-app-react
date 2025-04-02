import { Login as LoginForm } from "../components"; // Rename `l` to `LoginForm`

function Login() {
    return ( 
        <div className="py-8">
            <LoginForm />  {/* Use the correct uppercase name */}
            {/* <h1>hello</h1> */}
        </div>
     );
}

export default Login