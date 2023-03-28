import React from 'react';
import { useUser, withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0/client';


export const Profile: React.FC<WithPageAuthRequiredProps> = () => {

    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div>
            {user?.picture &&
                <img src={user?.picture} alt="sdw" />
            }

            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
        </div>
    )
}

export default withPageAuthRequired(Profile, {
    onRedirecting: () => <p>loading</p>
})