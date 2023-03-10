import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const role = "employee"; 
    const navigate = useNavigate();
    
    useEffect(() => {
      if(role === "employee") {
        navigate('/dashboard');
      }
      else if(role === "hod") {
        navigate('/HDashboard');
      }
      else if(role === "admin"){
        navigate('/ADashboard');
      }
      else{
        navigate('/*');
      }
    }, [])

  return (
    <>
    </>
  )
}

export default Home