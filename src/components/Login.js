import React, { useState } from 'react';

import './login.css';

function Login({ handleLogin, setClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleClose = () =>{
    setClose(true);
}

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(true);
    // aqui você pode adicionar a lógica de autenticação com a API de login
  };

  return (
    <div className="containers">
        <div className='loginheader'>
         <button onClick={handleClose} style={{ backgroundColor:'red',width:'15px',height:'15px', marginTop:'1%', marginLeft:'1%' , borderRadius:'150px'}}></button>
         <button style={{backgroundColor:'yellow',width:'15px',height:'15px', marginTop:'1%', marginLeft:'1%' , borderRadius:'150px'}}></button>
         <button style={{backgroundColor:'green', width:'15px',height:'15px', marginTop:'1%', marginLeft:'1%' , borderRadius:'150px'}}></button>
        </div>
        <div className='welcome'>
          <div className='line line3'>root@localhost:~$</div>
                
        <form className='loginform' onSubmit={handleSubmit}>               
              <div className="line line1"> WELCOME TO CECCHIN EVENTOS TEAM MANAGEMENT WEBSITE! </div>
              <div className="line line2">Please enter your credentials.<span className="blink">_</span></div>
          <label htmlFor="email">
          <span className='line line4'>Email:</span>
              <input className='line line5' type="email" autoComplete='current-user' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
          <label htmlFor="password">
              <span className='line line6'>Password:</span>
              <input className='line line7' type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button className='line line8' type="submit"><span className='line line9' >[ login ]</span></button>
        </form></div>
    </div>
  );
}

export default Login;
