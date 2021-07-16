import axios from "axios";

const API_URL = "https://graphql.datocms.com/";

export const addRecord = async (data = {}) => {
  const response = await axios.post("/api/tasks", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.registroCriado;
};

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

const dataScrap = {
  query: `query {
      allScraps { 
        id
        message
        creatorslug
        avatar 
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

export const getAllScraps = async () => {
  const result = await axios.post(`${API_URL}`, dataScrap, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return result.data.data.allScraps;
};
