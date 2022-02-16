import React from 'react';
import { Text, View } from 'react-native';
import axios from "axios";

const getPopularMovies = async () => {
  const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=290f2454df159987bb69a9944b9a8c59');
  return res.data.results;
}

const App = () => {
  
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
}

export default App;