import React, { useContext, useState } from 'react';
import '../../styles/login.css';

import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        actions.createUser(email, password).then(() => {
            actions.setToken(email, password).then(() => {
                if (store.token) {
                    navigate("/");
                } else {
                    setError("Invalid credentials");
                }
            });

        });
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
}