import React from 'react';
import { useUser, withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0/client';
import NavigationBar from '@/components/common/NavigationBar';
import PageHeading from '@/components/common/PageHeading';


export const Profile: React.FC<WithPageAuthRequiredProps> = () => {

    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div>
            <NavigationBar />


            <div>
                <PageHeading />
            </div>


        </div>
    )
}

export default withPageAuthRequired(Profile, {
    onRedirecting: () => <p>loading</p>
})