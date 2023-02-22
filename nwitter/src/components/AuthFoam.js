import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { authService } from '../fbase';

const AuthFoam = () => {

    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError]= useState('');

        const onChange = (e) =>{
            const {target : {name, value}} = e;
            if(name === 'email'){
                setEmail(value)
            }else if(name === 'password'){
                setPassword(value)
            }
        }

        const onSubmit = async (e) =>{
            e.preventDefault();
            try{
                let data;
                if(newAccount){
                    //공식문서, createUserWithEmailAndPassword : https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0
                    data = await createUserWithEmailAndPassword(authService, email, password);
                }else{
                    data = await signInWithEmailAndPassword(authService, email, password);
                }
                console.log(data)
            }catch(error){
                console.log(error)
                alert(error.message)
                setError(error.message)
            }
            // console.log(email, password)
        }

        const toggleAccount = () =>{
            setNewAccount((prev) =>(!prev))
        }

        return (
            <>
                <form onSubmit={onSubmit} className="container">
                    <input 
                        name='email' 
                        type="email" 
                        placeholder='email' 
                        onChange={onChange} 
                        className="authInput" 
                        required></input>
                    <input 
                        name='password' 
                        type="password" 
                        placeholder='password' 
                        onChange={onChange} 
                        className="authInput"
                        autoComplete
                        required></input>
                    <input 
                        type="submit" 
                        className="authInput authSubmit" 
                        value={newAccount ? "Create Account" : "Log In"}/>
                    {error && <span className="authError">{error}</span>}
                </form>
                <button onClick={toggleAccount} className="authSwitch">{newAccount ? "Log In" : "Create Account"}</button>
            </>
        )
    }

export default AuthFoam