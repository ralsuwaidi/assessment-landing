import React, { useEffect, useState } from 'react';
import { useUser, withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0/client';
import DefaultPage from '@/components/layouts/DefaultPage';
import ProfileApi from '@/lib/api/profile';
import ProfileDetail, { UserDetail } from '@/components/profile/ProfileDetail';
import { ProfileType, emptyProfile } from '@/lib/utils/profile-type';


export const Profile: React.FC<WithPageAuthRequiredProps> = () => {

    const { user, error, isLoading } = useUser();
    const [profile, setProfile] = useState<ProfileType>(emptyProfile);

    useEffect(() => {
        user ? (
            ProfileApi.getProfile(user['codershq_id'] as string).then((res: any) => {
                console.log(user)
                setProfile(res);
            })
        ) : (
            console.log("no user")
        )
    }, [user]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;


    return user ? (
        <DefaultPage>
            <div className=' mx-6 mb-3'>
                <h1 className="mb-4 mt-24 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{user.name ? user.name : user.email}</h1>
            </div>
            <div className='mb-3'>
                <UserDetail {...user} />
            </div>
            <ProfileDetail
                {...profile}
            />
        </DefaultPage>
    ) : (
        <p>Error no user</p>
    )
}

export default withPageAuthRequired(Profile, {
    onRedirecting: () => <p>loading</p>
})