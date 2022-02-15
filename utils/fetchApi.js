import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "f2018220bamsh7f200f514c8dcc9p1440f5jsnf62dbf26b0b3",
    },
  });

  return data;
};
