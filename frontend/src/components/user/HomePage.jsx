import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../common/FooterC'
import Complaint from '../user/Complaint';
import Image1 from '../Images/a1.jpg';
import Status from '../user/Status';

const HomePage = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('Complaint');
   const [userName, setUserName] = useState('');

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { name } = user;
               setUserName(name);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };

      getData();
   }, [navigate]);

   const handleNavLinkClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const Logout = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <>
         <nav className="navbar navbar-expand-lg bg-light">
            <div style={{backgroundColor:'white',color:'black'}} className="container-fluid">
               <h1 className="navbar-brand text-dark fw-bold">Hi, {userName}</h1>
               <div className="mt-2 navbar-collapse text-dark fw-bold" id="navbarSupportedContent">
                  <ul  className="navbar-nav me-auto mb-lg-0">
                     <li className="nav-item mb-2">
                        <NavLink
                           className={`nav-link text-dark ${activeComponent === 'Complaint' ? 'active' : ''}`}
                           onClick={() => handleNavLinkClick('Complaint')}
                        >
                           Complaint Register
                        </NavLink>
                     </li>
                     <li  className="nav-item mb-2">
                        <NavLink 
                           className={`nav-link text-dark ${activeComponent === 'Status' ? 'active' : ''}`}
                           onClick={() => handleNavLinkClick('Status')}
                        >
                           Status
                        </NavLink>
                     </li>
                  </ul>
               </div>
               <button className="btn btn-danger" onClick={Logout}>
                  LogOut
               </button>
            </div>
         </nav>
         <div  style={{backgroundColor:'pink'}} className="body">

            <div className="container">
               {activeComponent === 'Complaint' ? <Complaint /> : null}
               {activeComponent === 'Status' ? <Status /> : null}
            </div>
         </div>
         <Footer/>
      </>
   );
};

export default HomePage;





