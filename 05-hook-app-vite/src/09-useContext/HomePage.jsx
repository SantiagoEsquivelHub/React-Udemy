import React from 'react'

export const HomePage = () => {

    const { user } = useContext(UserContext);


    return (
        <div>
            <h1>HomePage <small>{user?.name}</small></h1>
            <hr />

            <pre>
                {
                    JSON.stringify(user, null, 3)
                }
            </pre>
        </div>
    )
}
