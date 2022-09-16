import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Message } from './Message';

export const SimpleForm = () => {

    const [formState, setFormState] = useState({
        username: 'Santiago',
        email: 'santi@gmail.com'
    });

    const { username, email } = formState;

    const onInputChange = ({ target }) => {

        const { name, value } = target;

        setFormState({
            ...formState,
            [name]: value
        })

    }





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

            {
                username == 'Santiago' && <Message />
            }

        </div>
    )
}
