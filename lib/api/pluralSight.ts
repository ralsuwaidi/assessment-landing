import ApolloClient, { InMemoryCache } from "apollo-boost";
import gql from "graphql-tag";

export type SkillResultType = {
  userId: string;
  skillName: string;
  quintileLevel:
    | "novice"
    | "proficient-emerging"
    | "proficient-average"
    | "proficient-above-average"
    | "expert";
  completedOn: string;
};

type PluralSightType = {
  getSkills: (first: number) => Promise<any>;
  getSkillResults: (first: number) => Promise<SkillResultType[]>;
  getUsers: (ids: string[]) => Promise<any>;
  getTotalSkills: () => Promise<number>;
  getTotalUsers: () => Promise<number>;
  getTotalContent: () => Promise<number>;
};

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_PLURALSIGHT_BASE_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PLURALSIGHT_TOKEN}`,
  },
});

const PluralSight: PluralSightType = {
  getSkills: (first: number = 10) =>
    client.query({
      query: gql`
        query {
          skillAssessmentCatalog(first: ${first}) {
            nodes {
              name
            }
          }
        }
      `,
    }),

  getSkillResults: async (first: number = 10): Promise<SkillResultType[]> => {
    const { data } = await client.query({
      query: gql`
        query {
          skillAssessmentResults(first: ${first}) {
            nodes {
              userId
              quintileLevel
              completedOn
              skillName
            }
          }
        }
      `,
    });
    return data.skillAssessmentResults.nodes;
  },

  getTotalSkills: async () => {
    const { data } = await client.query({
      query: gql`
        query {
          skillAssessmentCatalog {
            totalCount
          }
        }
      `,
    });
    return data.skillAssessmentCatalog.totalCount;
  },

  getUsers: async (ids: string[]) => {
    const { data } = await client.query({
      query: gql`
        query {
          users(first: ${ids.length}, filter: {ids: [${ids
        .map((id) => `"${id}"`)
        .join(",")} ]}) {
            nodes {
              id
              email
            }
          }
        }
      `,
    });
    return data.users.nodes;
  },

  getTotalUsers: async () => {
    const { data } = await client.query({
      query: gql`
        query {
          users {
            totalCount
          }
        }
      `,
    });
    return data.users.totalCount;
  },

  getTotalContent: async () => {
    const { data } = await client.query({
      query: gql`
        query {
          skillAssessmentResults {
            totalCount
          }
        }
      `,
    });
    return data.skillAssessmentResults.totalCount;
  },
};

export default PluralSight;
