import React from 'react';
import ReactDOM from 'react-dom/client';
import { LogIn } from './components/login/login';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { UserProvider } from './context/user.context';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { Home } from './components/home/home';
import { SingUp } from './components/singUp/singUp';
import { About } from './components/singUp/about/about';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path='/' element={ <LogIn /> } />
        <Route path='/singup' element={ <SingUp /> } />
        <Route path='/singup/about' element={ <About /> } />
        <Route path='/Home' element={ <Home /> } />
      </Routes>
    </UserProvider>
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
