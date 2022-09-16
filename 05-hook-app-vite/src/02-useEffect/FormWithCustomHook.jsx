import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useForm } from '../hooks/useForm';
import { Message } from './Message';

export const FormWithCustomHook = () => {


    const { formState, onInputChange, username, password, email, handleReset } = useForm({
        username: '',
        email: '',
        password: ''
    });

    /* const { username, email, password } = formState; */

    

    return (
        <div>
            <h1>SimpleForm</h1>
            <hr />

            <input
                type="text"
                name="username"
                className='form_control'
                placeholder='Username'
                value={username}
                onChange={onInputChange}
            />

            <input
                type="email"
                name="email"
                className='form_control'
                placeholder='Email'
                value={email}
                onChange={onInputChange}
            />

            <input
                type="password"
                name="password"
                className='form_control'
                placeholder='Password'
                value={password}
                onChange={onInputChange}
            />

            {/* {
                username == 'Santiago' && <Message />
            } */}

            <button
                className='btn btn-primary'
                onClick={handleReset}>Borrar</button>

        </div>
    )
}
