import { useState, useRef, useEffect } from 'react';
import bglmg from './avatar.png';
import './App.css';
import { useForm } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';



export const Register = () => {

    const {register, handleSubmit, watch, formState:{errors}} = useForm()
    const onSubmit = data => console.log(data);

   return (
    <section>
        <div class = "registrationbox">
        <img src={bglmg} alt="" class = "avatar"/>
			<h1>Utwórz konto</h1>
			
			<form action="/register" method="post" onSubmit={handleSubmit(onSubmit)}>
                <p>Imię</p>
                <div class = "inputbox">
               <FontAwesomeIcon icon = {faUser} color="rgb(99, 94, 94)"></FontAwesomeIcon>
				<input type="text" {...register("name")} placeholder="Podaj imię"/>
                </div>

                <p>Nazwisko</p>
                <div class = "inputbox">
                <FontAwesomeIcon icon = {faUser} color="rgb(99, 94, 94)"></FontAwesomeIcon>
				<input type="text" {...register("lastname")} placeholder="Podaj nazwisko"/>
                </div>

				<p>Email</p>
                <div class = "inputbox">
                <FontAwesomeIcon icon = {faEnvelope} color="rgb(99, 94, 94)"></FontAwesomeIcon>
				<input type="email" {...register("email" , { required : true})} placeholder="Podaj email"/>
                {errors.email?.type === "required" && "Adres email jest wymagany"}
                </div>


				<p>Hasło</p>
                <div class = "inputbox">
                <FontAwesomeIcon icon = {faLock} color="rgb(99, 94, 94)"></FontAwesomeIcon>
				<input type="password" {...register("password" , { required : true, maxLength: 12 })} placeholder="Podaj hasło"/>
                {errors.password?.type === "maxLength" && "Hasło musi mieć 12 znaków"}
                </div>

                <p>Potwierdzenie hasła</p>
                <div class = "inputbox">
                <FontAwesomeIcon icon = {faLock} color="rgb(99, 94, 94)"></FontAwesomeIcon>
				<input type="password" {...register("confirmpwd" , { required : true, maxLength: 12 })} placeholder="Powtórz hasło"/>
                {errors.confirmpwd?.type === "maxLength" && "Hasło musi mieć 12 znaków"}
                </div>
                
				<button>Utwórz konto</button>
			</form>
    </div>
    </section>
  );
}

export default Register