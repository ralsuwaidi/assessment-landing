export type ProfileType = {
  about: string | null;
  academic_qualification: string | null;
  codershq_id: string | null;
  createdAt: string | null;
  employer: string | null;
  first_name: string | null;
  gender: "Male" | "Female" | "Other";
  github: string | null;
  is_seeking_job: boolean;
  is_working: boolean;
  last_name: string | null;
  linkedin: string | null;
  mobile: string | null;
  nationality: string | null;
  personal_site: string | null;
  proud_project: string | null;
  updatedAt: string | null;
  user_id: number | null;
  years_experience: number | null;
};

export const emptyProfile: ProfileType = {
  about: "",
  academic_qualification: "",
  codershq_id: "",
  createdAt: "",
  employer: null,
  first_name: "",
  gender: "Other",
  github: null,
  is_seeking_job: false,
  is_working: false,
  last_name: "",
  linkedin: null,
  mobile: "",
  nationality: "",
  personal_site: null,
  proud_project: "",
  updatedAt: "",
  user_id: 0,
  years_experience: 0,
};
