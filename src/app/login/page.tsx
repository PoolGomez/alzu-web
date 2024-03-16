'use client';
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(ev: FormEvent<HTMLFormElement>){
        ev.preventDefault();
        setLoginInProgress(true);
        await signIn('credentials',{email, password, callbackUrl: '/'});

        // const {ok} = await fetch('api/login',{
        //                     method:'POST',
        //                     body: JSON.stringify({email, password}),
        //                     headers: {'Content-Type':'application/json'},
        //                 });
        // if(ok){

        // }else{

        // }
        setLoginInProgress(false);
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Login
            </h1>
            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input  type="email" name="email" placeholder="email" value={email} 
                        disabled={loginInProgress} 
                        onChange={e => setEmail(e.target.value)}/>
                <input type="password" name="password" placeholder="password" value={password} 
                        disabled={loginInProgress} 
                        onChange={e => setPasword(e.target.value)}/>
                <button type="submit" disabled={false} >Login</button>
                <div className="my-4 text-center text-gray-500">
                    or login whit provider
                </div>
                <button type="button" onClick={()=>signIn('google',{callbackUrl:'/'})} disabled={loginInProgress} className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={'login'} width={24} height={24}/>
                    Login with google
                </button>
                {/* <div className="text-center text-gray-500 my-4 border-t pt-4">
                    Existing account? {' '}
                    <Link className="underline" href={'/login'} >Login here &raquo;</Link>
                </div> */}
            </form>
        </section>
    )
}