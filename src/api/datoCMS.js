import { GraphQLClient } from "graphql-request";
import { SiteClient } from "datocms-client";

const API_URL = "https://graphql.datocms.com/";
const API_TOKEN = process.env.DATOCMS_TOKEN;
const client = new SiteClient(process.env.NEXT_PUBLIC_API_TOKEN);

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

export const createNewCommunity = async (image, link, title) => {
  const newCommunity = await client.items.create({
    itemType: "966896",
    title: title,
    link: link,
    image: image,
  });
  return newCommunity;
};
