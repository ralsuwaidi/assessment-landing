import LandingApi from "../api/landing";
import PluralSight, { SkillResultType } from "../api/pluralSight";

export type UserProfileType = {
  id: string;
  skillName: string;
  quintileLevel: string;
  completedOn: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
};

export async function GetExperts(results: number): Promise<UserProfileType[]> {
  // get all experts from Pluralsight
  const allSkills = await PluralSight.getSkillResults(results);
  const experts: SkillResultType[] = allSkills.filter(
    (result) => result.quintileLevel === "expert"
  );
  const expertUserIds = experts.map((expert) => expert.userId);
  // get data of all experts including email
  const users: any[] = await PluralSight.getUsers(expertUserIds);
  // get all user profiles
  const rawProfiles = await LandingApi.getProfiles(0, 100);
  const profiles = rawProfiles.map((profile: any) => profile.attributes);
  // combine user model with skillResultmodel
  const expertsWithUsers = experts.map((expert) => {
    // match user and expert models
    const user = users.find((user) => user.id === expert.userId);
    let profile: any | null;
    if (user) {
      profile = profiles.find(
        (profile: any) => profile.user_id + "@codershq.ae" === user.email
      );
    }

    return {
      id: expert.userId,
      skillName: expert.skillName,
      quintileLevel: expert.quintileLevel,
      completedOn: expert.completedOn,
      email: user ? user.email : null,
      firstName: profile ? profile.first_name : null,
      lastName: profile ? profile.last_name : null,
    };
  });

  return expertsWithUsers;
}
