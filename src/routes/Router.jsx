import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hero from '../pages/hero/Hero';
import Test from '../pages/Test';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Chats from '../components/auth/Chats';
import Login from '../components/auth/Login';
import AuthDetails from '../components/auth/AuthDetails';
import Registration from '../components/auth/Registration';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="test" element={<Test />} />
      <Route path="zikr" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={< Login/>} />
      <Route path="chats" element={<Chats />} />
      <Route path='auth' element= {<AuthDetails/>}/>
      <Route path='register' element={<Registration/>}/>
    </Routes>
  );
};

export default Router;
