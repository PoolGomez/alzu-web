'use client'
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    function handleFormSubmit(ev: FormEvent<HTMLFormElement>){
        ev.preventDefault();
        fetch('/api/register',{
            method:'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type':'application/json'},
        })
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={e => setPasword(e.target.value)}/>
                <button type="submit">Register</button>
                <div className="my-4 text-center text-gray-500">
                    or login whit provider
                </div>
                <button className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={'login'} width={24} height={24}/>
                    Login with google
                </button>
            </form>
            
        </section>
    )
}