import { useDispatch } from "react-redux";
import authService from '../../appwrite/auth'
import {logOut} from '../../store/authslice'
import { Navigate, useNavigate } from "react-router-dom";

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandle = () => {
        authService.logOut().then(()=>{
            dispatch(logOut())
            navigate("/login");
        })
    }

    return ( 
        <div>
            <button className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={logoutHandle}>Log Out</button>
            {/* <h1>hello</h1> */}
        </div>
     );
}

export default LogoutBtn;