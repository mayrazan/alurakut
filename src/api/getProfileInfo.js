import axios from "axios";

export const getProfileInfo = async (githubUser) => {
  const response = await axios.get(
    `https://api.github.com/users/${githubUser}`
  );

  return response.data;
};

export const getProfileFollowers = async (githubUser) => {
  const response = await axios.get(
    `https://api.github.com/users/${githubUser}/followers`
  );

  return response.data;
};

export const verifyUser = async (githubUser) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${githubUser}`
    );
    if (response.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
};
