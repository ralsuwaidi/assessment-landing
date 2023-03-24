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
  get: () => Promise<LandingResponse>;
};

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const config = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    "Content-Type": "application/json",
  },
};

const LandingApi: LandingApiType = {
  get: () => axios.get(`${SERVER_BASE_URL}assessment-landing-page`, config),
};

export default LandingApi;
