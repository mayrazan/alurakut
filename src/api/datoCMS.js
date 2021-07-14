import { GraphQLClient } from "graphql-request";
// import { useMutation, useQuery, GraphQLClient } from "graphql-hooks";

const API_URL = "https://graphql.datocms.com/";
const API_TOKEN = process.env.DATOCMS_TOKEN;

// const LIST_COMMUNITIES = `
//     query ListCommunities {
//         allCommunities {
//             id
//             image
//             link
//             title
//         }
//     }
// `;

// const CREATE_COMMUNITY = `
//     mutation CreateCommunity($image: String!, $link: String!, $title: String!) {
//         createCommunity(image: $image, link: $link, $title: title) {
//             image
//             link
//             title
//         }
//     }
// `;

// export const { data = { allCommunities: [] }, refetch: refetchCommunities } =
//   useQuery(LIST_COMMUNITIES);

// const [createCommunity] = useMutation(CREATE_COMMUNITY);

// export const createNewCommunity = async () => {
//   await createCommunity({ variables: { image, link, title } });
//   refetchCommunities();
// };

export const getAllCommunities = async () => {
  const data = await request({
    query: `{ allCommunities { 
            id
            image
            link
            title } }`,
  });
  return data.allCommunities;
};

const request = ({ query, variables }) => {
  const client = new GraphQLClient(`${API_URL}`, {
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return client.request(query, variables);
};
