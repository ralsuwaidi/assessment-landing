import ApolloClient, { InMemoryCache } from "apollo-boost";
import gql from "graphql-tag";

type PluralSightType = {
  getAllData: () => Promise<any>;
};

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_PLURALSIGHT_BASE_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PLURALSIGHT_TOKEN}`,
  },
});

const PluralSight: PluralSightType = {
  getAllData: async () => {
    const skills = await client.query({
      query: gql`
        query {
          skillAssessmentCatalog(first: 10) {
            nodes {
              name
            }
          }
        }
      `,
    });

    const totalSkills = await client.query({
      query: gql`
        query {
          skillCatalog {
            totalCount
          }
        }
      `,
    });

    const users = await client.query({
      query: gql`
        query {
          users(first: 10) {
            nodes {
              firstName
              lastName
              email
            }
          }
        }
      `,
    });

    return {
      skills: skills.data.skillAssessmentCatalog.nodes,
      totalSkills: totalSkills.data.skillCatalog.totalCount,
      users: users.data.users.nodes,
    };
  },
};

export default PluralSight;
