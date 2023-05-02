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
};

export default ProfileApi;
