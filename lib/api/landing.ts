import axios from "axios";
import { LandingType } from "../utils/landing-type";

type LandingResponse = {
  data: {
    data: {
      attributes: LandingType;
    };
  };
};

type LandingApiType = {
  getLanding: () => Promise<LandingResponse>;
  getProfiles: (page: number, limit: number) => Promise<any>;
};

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const config = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    "Content-Type": "application/json",
  },
};

const LandingApi: LandingApiType = {
  getLanding: () =>
    axios.get(`${SERVER_BASE_URL}assessment-landing-page`, config),

  getProfiles: async (page = 0, limit = 100) => {
    const response = await axios.get(
      `${SERVER_BASE_URL}chq-profiles?pagination[start]=${page}&pagination[limit]=${limit}`,
      config
    );
    const { data, meta } = response.data;
    if (data.length < limit || page + limit >= meta.pagination.total) {
      return data;
    } else {
      const nextPage = page + limit;
      const remainingData = await LandingApi.getProfiles(nextPage, limit);
      return [...data, ...remainingData];
    }
  },
};

export default LandingApi;
