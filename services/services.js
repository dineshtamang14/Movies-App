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

// Get Famliy Movies
export const getFamilyMovies = async () => {
  const res = await axios.get(`${apiUrl}/discover/movie?${key}&with_genres=10751`);
  return res.data.results;
}

// Get Documentries
export const getDocumentry = async () => {
  const res = await axios.get(`${apiUrl}/discover/movie?${key}&with_genres=99`);
  return res.data.results;
}


// Get Movies
export const getMovie = async (id) => {
  const res = await axios.get(`${apiUrl}/movie/${id}?${key}`);
  return res.data;
}

