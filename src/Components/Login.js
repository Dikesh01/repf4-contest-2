import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  function loginContinue(e) {
    e.preventDefault();

    if(!username || !password){
        alert("Username and password required!")
        return;
    }

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          alert("Invalid credentials!");
          return;
        }

        alert("User logged in Successfully!");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("userDetails", JSON.stringify(data));
        navigate('/profile')
      })
      .catch((err) => {
        console.log("something wrong", err);
      });
  }

  return (
    <div className="login_page">
            <div className="logIn_container">
                <form onSubmit={loginContinue}>
                    <div>
                        <p>Welcome back! 👋</p>
                        <h2>Sign in to your account</h2>
                    </div>
                    <div className="emailClass">
                        <label for="email">Your email</label>
                        <input type="text" id="email" name="email" 
                        onChange={(e)=>setUsername(e.target.value)}/>
                        
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" 
                        onChange={(e)=>setPassword(e.target.value)}  />
                    </div>
                    <button type="submit">CONTINUE</button>
                    <a id="forgot_password" href="https://www.google.com/">Forget your password?</a>
                    {/* {error && alert(error)} */}
                    
                </form>
                <p>Don’t have an account? <a href="https://www.google.com/">Sign up</a></p>
            </div>
        </div>
  );
};

export default Login;
