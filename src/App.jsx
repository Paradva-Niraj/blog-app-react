import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth"
import {login,logOut} from "./store/authslice"
import {Header,Footer} from './components'
import { Outlet } from 'react-router-dom';

function App() {
  
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData) dispatch(login({userData}))
      else {dispatch(logOut())}
    })
    .catch((error)=>{
      console.log(error);
    }).finally(()=>setLoading(false))
  },[])

  if(loading){
    return(<h1>loading...</h1>)
  }
  else{
    return(
      <>
        <div className='min-h-screen flex flex-wrap content-center bg-gray-400'>
          <div className='w-full block'>
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </>
    )
  }

}

export default App
