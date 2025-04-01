import { useDispatch } from "react-redux";
import authService from '../../appwrite/auth'
import {logout} from '../../store/authslice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandle = () => {
        authService.logOut().then(()=>{
            dispatch(logout)
        })
    }

    return ( 
        <div>
            <button className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={logoutHandle}></button>
        </div>
     );
}

export default LogoutBtn;