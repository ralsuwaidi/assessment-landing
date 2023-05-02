import { SkillResultType } from '@/lib/api/pluralSight';
import { ProfileType } from '@/lib/utils/profile-type';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import React from 'react'; // we need this to make JSX compile


/**
 * This function renders the ProfileDetail component with provided props.
 *
 * @param {object} props - An object with the following properties:
 *    @param {string} props.github - The Github profile link.
 *    @param {string} props.linkedin - The LinkedIn profile link.
 *    @param {string} props.academic_qualification - The academic qualification of the user.
 *    @param {number} props.years_experience - The years of experience of the user.
 * @return {JSX.Element} Returns the ProfileDetail component.
 */
const ProfileDetail = ({ github, linkedin, academic_qualification, years_experience }: ProfileType) => (
  <div className='sm:p-4 border border-slate-300 rounded-md sm:mx-4 mx-2'>
    <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3'>
      <Detail title="Github" value={github} />
      <Detail title="Linkedin" value={linkedin} />
      <Detail title="Qualification" value={academic_qualification} />
      <Detail title="Experience Years" value={years_experience} />
    </div>
  </div>
)

/**
 * Renders a list of skills with their corresponding scores and completion dates.
 *
 * @param {Array} skills - An array of objects containing skill data.
 * @param {string} skills.skillName - The name of the skill.
 * @param {number} skills.quintileLevel - The score of the skill on a scale of 1-5.
 * @param {string} skills.completedOn - The completion date of the skill.
 * @return {JSX.Element} A React component that renders a list of skills.
 */
export const SkillResults = ({ skills }: { skills: SkillResultType[] }) => (
  <div className=' mx-2 sm:grid sm:grid-cols-2 grid grid-cols-1 gap-2 sm:mx-4 mt-3'>
    {skills.map((skill: SkillResultType) => (
      <div key={skill.skillName} className='border rounded-md border-slate-300'>
        <p className='p-2 pt-3 mx-2 text-slate-400'>{skill.skillName}</p>
        <Detail title="Score" value={skill.quintileLevel} />
        <Detail title="Completed" value={skill.completedOn} />
      </div>
    ))}
  </div>
)


/**
 * Renders the authentication details component.
 *
 * @param {object} UserProfile - an object containing user profile details
 * @param {string} UserProfile.name - the name of the user
 * @param {string} UserProfile.codershq_id - the Coders HQ ID of the user
 * @param {string} UserProfile.email - the email of the user
 * @return {JSX.Element} - the authentication details component JSX element
 */
export const AuthDetail = ({ name, codershq_id, email }: UserProfile) => (
  <div className='sm:p-4 border border-slate-300 rounded-md sm:mx-4 mx-2'>
    <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3'>
      <Detail title="Name" value={name} />
      <Detail title="Codershq Id" value={codershq_id} />
      <Detail title="Email" value={email} />
    </div>
  </div>
)
/**
 * Renders a component displaying a message indicating that no profile is
 * available.
 *
 * @return {JSX.Element} The rendered component.
 */
export const NoProfile = () => (
  <div className='sm:p-4 border border-slate-300 rounded-md sm:mx-4 mx-2 '>
    <div className='m-auto text-center align-middle'>
      <p className='my:12 text-slate-600 sm:my-24 align-middle'>No profile</p>
    </div>
  </div>
)

/**
 * Renders a detail component with a title and a value, or "none" if value is nullish.
 *
 * @param {object} DetailProp - The detail component props.
 * @param {string} DetailProp.title - The title to display.
 * @param {any} DetailProp.value - The value to display, or nullish if not provided.
 * @returns {JSX.Element} - The detail component JSX element.
 */
const Detail = (DetailProp: { title: string, value?: any }): JSX.Element => (
  <div className='p-4'>
    <p className='text-slate-400'>{DetailProp.title}</p>
    <p className='truncate'>{DetailProp.value ?? "none"}</p>
  </div>
);


export default ProfileDetail
