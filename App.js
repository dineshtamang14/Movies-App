import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import axios from "axios";

const getPopularMovies = async () => {
  const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=290f2454df159987bb69a9944b9a8c59');
  return res.data.results;
}

const App = () => {
  const [Movies, setMovies] = useState([]);

  useEffect(() => {
    getPopularMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text>{movies}</Text>
    </View>
  );
}

export default App;