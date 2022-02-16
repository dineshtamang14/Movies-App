import axios from "axios";

const apiUrl = "https://api.themoviedb.org/3"
const key = "api_key=290f2454df159987bb69a9944b9a8c59";

// Get Popular Movies
export const getPopularMovies = async () => {
  const res = await axios.get(`${apiUrl}/movie/popular?${key}`);
  return res.data.results;
}

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const res = await axios.get(`${apiUrl}/movie/upcoming?${key}`);
  return res.data.results;
}

// Get Popular TV
export const getPopularTv = async () => {
  const res = await axios.get(`${apiUrl}/tv/popular?${key}`);
  return res.data.results;
}

