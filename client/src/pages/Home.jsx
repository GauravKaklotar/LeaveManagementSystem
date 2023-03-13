import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Dashboard from '.../pages/Employee/Dashboard';

const Home = () => {

  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    axios.get('/api/getRole').then((res) => {
      console.log(res);
      setRole(res.data.role);
      console.log(res.data.role);
      if(res.data.Error)
      {
        navigate('/login');
      }
    }).catch((Error) => {
      // console.log(Error);
      // navigate('/login');
    });
    
  }, []);

  console.log(role);

  if (role === "ADMIN") {
    navigate('/ADashboard');
  }
  else if (role === 'STAFF') {
    navigate('/dashboard');
  }
  else if (role === "HOD") {
    navigate('/HDashboard');
  }

  return (
    <>
      {/* <h2>Home</h2> */}
      {/* {role === '' ? navigate('/login') : navigate('/login')} */}
    </>
  );
}

export default Home;