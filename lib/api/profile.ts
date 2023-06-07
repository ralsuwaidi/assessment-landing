import axios from "axios";

type ProfileType = {
  /**
    Async function to retrieve profiles from a given page with a specified limit.
    @async
    @function getProfiles
    @param {number} [page=0] - The page number to start retrieving profiles from.
    @param {number} [limit=100] - The maximum number of profiles to retrieve per page.
    @returns {Promise} - A promise that resolves with an array of profiles. */
  all: (page: number, limit: number) => Promise<any>;
  /**
    Retrieves the profile information of a user with the given CodersHQ ID. *
    @async
    @function
    @param {string} codershqId - The CodersHQ ID of the user whose profile information is to be retrieved.
    @returns {void} */
  getProfile: (codershqId: string) => Promise<any | null>;
  /**
   * Creates a user profile with the given codershqId and optional name.
   * If a profile already exists with the given codershqId, returns that profile.
   * Otherwise, creates a new profile with the given data and returns its attributes.
   *
   * @async
   * @param {string} codershqId - The codershqId of the user.
   * @param {string} [name] - The name of the user (optional).
   * @returns {Object | null} - The attributes of the created or existing profile, or null if an error occurs.
   */
  createProfile: (
    codershqId: string,
    name?: string
  ) => Promise<any | undefined>;
  /**
    Retrieves the profile information of a user with the given CodersHQ ID. *
    @async
    @param {string} email - The email of the logged in user
    @returns {boolean} - True if the password is correct, else false
  */
  checkPassword: (email: string, password: string) => Promise<boolean>;
};

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const config = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    "Content-Type": "application/json",
  },
};



const ProfileApi: ProfileType = {
  all: async (page = 0, limit = 100) => {
    const response = await axios.get(
      `${SERVER_BASE_URL}chq-profiles?pagination[start]=${page}&pagination[limit]=${limit}`,
      config
    );
    const { data, meta } = response.data;
    if (data.length < limit || page + limit >= meta.pagination.total) {
      return data;
    } else {
      const nextPage = page + limit;
      const remainingData = await ProfileApi.all(nextPage, limit);
      return [...data, ...remainingData];
    }
  },

  getProfile: async (codershqId: string) => {
    const response = await axios.get(
      `${SERVER_BASE_URL}chq-profiles?filters[codershq_id][$eq]=${codershqId}`,
      config
    );
    const { data, meta } = await response.data;
    try {
      return data[0].attributes;
    } catch (error) {
      return null;
    }
  },

  createProfile: async (codershqId: string, name?: string) => {
    const profile = await ProfileApi.getProfile(codershqId);
    if (profile) {
      return profile;
    }
    const profileData = {
      data: {
        codershq_id: codershqId,
        ...(name && { name }),
      },
    };

    const response = await axios.post(
      `${SERVER_BASE_URL}chq-profiles`,
      {
        ...profileData,
      },
      config
    );
    const { data, meta } = await response.data;
    console.log(data);
    try {
      return data.attributes;
    } catch (error) {
      return null;
    }
  },

  checkPassword: async (email: string, password: string) => {
    try {

      // Calculate the date 10 minutes ago
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

      // Adjust the date for the UAE locale (subtract 4 hours)
      tenMinutesAgo.setHours(tenMinutesAgo.getHours());

      const response = await axios.get(`${SERVER_BASE_URL}assessment-passwords`, {
        params: {
          "filters[email][$eq]": email,
          "filters[createdAt][$gt]": tenMinutesAgo.toISOString(),
        },
        ...config
      });

      const { data, meta } = response.data;
      console.log(data)
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (password === element.attributes.password) {
            return true;
          }
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  },


};

export default ProfileApi;
