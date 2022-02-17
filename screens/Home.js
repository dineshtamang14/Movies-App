import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import { getPopularMovies, getUpcomingMovies } from '../services/services'
import { SliderBox } from 'react-native-image-slider-box'
import List from '../components/List';


const dimensions = Dimensions.get('screen');
const Home = () => {
    const [moviesImg, setMoviesImg] = useState([]);
    const [popularMovies, setPopularMovies] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        getUpcomingMovies().then(movies => {
            const newMovies = [];
            movies.forEach(movie => {
                newMovies.push('https://image.tmdb.org/t/p/w500' + movie.poster_path);
            });
            setMoviesImg(newMovies);
        }).catch(err => {
            setError(err);
        })


      getPopularMovies().then(movies => {
        setPopularMovies(movies);
      }).catch(err => {
        setError(err);
      })

    }, []);

    return (
        <React.Fragment>
            <View style={styles.sliderContainer}>
                <SliderBox 
                    images={moviesImg} 
                    autoplay={true} 
                    dotStyle={styles.sliderStyle}
                    circleLoop={true} 
                    sliderBoxHeight={dimensions.height / 1.5}
                />
            </View>

            <View style={styles.carousel}>
                <List content={popularMovies} title="Popular Movies" />
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sliderStyle: {
        height: 0,
    },
    carousel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Home;