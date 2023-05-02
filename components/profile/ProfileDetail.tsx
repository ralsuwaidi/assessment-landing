import { ProfileType } from '@/lib/utils/profile-type';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import React from 'react'; // we need this to make JSX compile



const ProfileDetail = ({ github, linkedin, academic_qualification, years_experience }: ProfileType) => (
  <div className='sm:p-4 border border-slate-300 rounded-md sm:mx-4 mx-2'>
    <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3'>
      <Detail title="Github" value={github} />
      <Detail title="Linkedin" value={linkedin} />
      <Detail title="Academic Qualification" value={academic_qualification} />
      <Detail title="Experience Years" value={years_experience} />
    </div>
  </div>)


export const UserDetail = ({ name, codershq_id, email }: UserProfile) => (
  <div className='sm:p-4 border border-slate-300 rounded-md sm:mx-4 mx-2'>
    <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3'>
      <Detail title="Name" value={name} />
      <Detail title="Codershq Id" value={codershq_id} />
      <Detail title="Email" value={email} />
    </div>
  </div>)

const Detail = (DetailProp: any) => (
  <div className='p-4'>
    <p className=' text-slate-400'>{DetailProp.title}</p>
    <p className='truncate'>{DetailProp.value ?? "none"}</p>
  </div>
)

export default ProfileDetail
