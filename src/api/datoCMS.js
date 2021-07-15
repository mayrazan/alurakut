import { SiteClient } from "datocms-client";
import axios from "axios";

const API_URL = "https://graphql.datocms.com/";
const client = new SiteClient(process.env.NEXT_PUBLIC_API_TOKEN);

export const createNewCommunity = async (image, link, title) => {
  const newCommunity = await client.items.create({
    itemType: "966896",
    title: title,
    link: link,
    image: image,
  });
  return newCommunity;
};

export async function getDataApi() {
  const records = await client.items.all({
    filter: {
      itemType: "966896",
    },
  });
  return records;
}

const data = {
  query: `query {
      allCommunities { 
        id
        image
        link
        title 
      }
    }`,
};

export const getAllCommunities = async () => {
  const result = await axios.post(`${API_URL}`, data, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return result.data.data.allCommunities;
};
