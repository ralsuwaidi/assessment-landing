import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useUser, withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0/client';
import DefaultPage from '@/components/layouts/DefaultPage';
import ProfileApi from '@/lib/api/profile';
import ProfileDetail, { NoProfile, SkillResults, AuthDetail, GetAssessed } from '@/components/profile/ProfileDetail';
import { ProfileType, emptyProfile } from '@/lib/utils/profile-type';
import PluralSight, { SkillResultType } from '@/lib/api/pluralSight';
import LoadingSpinner from '@/components/common/LoadingSpinner';


export const Profile: React.FC<WithPageAuthRequiredProps> = () => {

    const { user, error, isLoading } = useUser();
    const [profile, setProfile] = useState<ProfileType>();
    const [skills, setSkills] = useState<SkillResultType[] | []>([]);
    const [isDone, setIsDone] = useState(false);

    const fetchData = useCallback(async () => {
        // Check if user is defined before proceeding
        if (!user) {
            return;
        }

        try {
            // Fetch the user's profile
            const res = await ProfileApi.getProfile(user['codershq_id'] as string);

            if (res) {
                // Set the user's profile if it exists
                setProfile(res);

                if (res.user_id) {
                    // If the user has an old user ID, fetch their skills from PluralSight
                    const pluralUsers = await PluralSight.getUsersByEmail([`${res.user_id}@codershq.ae`]);
                    // Check if pluralUsers is defined and has at least one element
                    if (pluralUsers?.[0]?.id) {
                        // If so, fetch the user's skills
                        const skills = await PluralSight.getSkillsByUserId(pluralUsers[0].id);
                        // Set the user's skills
                        setSkills(skills);
                    }
                } else {
                    // find user based on codershq_id
                    const pluralUsers = await PluralSight.getUsersByEmail([`${user['codershq_id']}@codershq.ae`]);
                    // Check if pluralUsers is defined and has at least one element
                    if (pluralUsers?.[0]?.id) {
                        // If so, fetch the user's skills
                        const skills = await PluralSight.getSkillsByUserId(pluralUsers[0].id);
                        // Set the user's skills
                        setSkills(skills);
                    }
                }
            } else {
                const response = await ProfileApi.createProfile(user['codershq_id'] as string, user.name ? user.name : undefined);
                console.log(response)
                setProfile(response)
            }

            // Set isDone to true to indicate that data fetching is complete
            setIsDone(true);
        } catch (error) {
            console.error(error);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    if (isLoading) return <div>Loading...</div>;
    if (!user) return <p>Error no user</p>;
    if (error) return <div>{error.message}</div>;
    if (!isDone) return <LoadingSpinner />;

    return (
        <DefaultPage>
            <div className=' mx-6 mb-6'>
                <h1 className="mb-4 mt-24 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{user.name ?? user.email}</h1>
            </div>
            <div className='mb-6'>
                <AuthDetail {...user} />
            </div>
            <div className='mb-6'>
                {profile ? <ProfileDetail {...profile} /> : <NoProfile />}
            </div>
            <p className='mx-6 mb-4 mt-24 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Assessment Result</p>
            <div className='mb-6'>
                {skills.length > 0 ? <SkillResults skills={skills} /> : <GetAssessed />}
            </div>

        </DefaultPage>
    )
}

export default withPageAuthRequired(Profile, {
    onRedirecting: () => <LoadingSpinner />
})