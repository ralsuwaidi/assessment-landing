import React from 'react';
import { useUser, withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0/client';
import NavigationBar from '@/components/common/NavigationBar';
import PageHeading from '@/components/common/PageHeading';
import DefaultPage from '@/components/layouts/DefaultPage';


export const Profile: React.FC<WithPageAuthRequiredProps> = () => {

    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return user ? (
        <DefaultPage>
            <div className='container mx-6'>
                <h1 className="mb-4 mt-24 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{user.name ? user.name : user.email}</h1>
            </div>
        </DefaultPage>
    ) : (
        <p>Error no user</p>
    )
}

export default withPageAuthRequired(Profile, {
    onRedirecting: () => <p>loading</p>
})