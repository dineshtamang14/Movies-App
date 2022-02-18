import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { getPopularMovies, getUpcomingMovies, getPopularTv, getFamilyMovies, getDocumentry } from '../services/services'
import { SliderBox } from 'react-native-image-slider-box'
import List from '../components/List';


const dimensions = Dimensions.get('screen');
const Home = () => {
    const [moviesImg, setMoviesImg] = useState([]);
    const [popularMovies, setPopularMovies] = useState('');
    const [popularTv, setPopularTv] = useState('');
    const [familyMovies, setFamilyMovies] = useState('');
    const [documentry, setDocumentry] = useState('');
    const [error, setError] = useState(false);

    const getData = () => {
        return Promise.all([
            getUpcomingMovies(),
            getPopularMovies(),
            getPopularTv(),
            getFamilyMovies(),
            getDocumentry()
        ])
    }

    useEffect(() => {

        getData().then(([upcomingMovies, popularMovies, popularTv, familyMovies, documentry]) => {
            const newMovies = [];
            upcomingMovies.forEach(movie => {
                newMovies.push('https://image.tmdb.org/t/p/w500' + movie.poster_path);
            });
            setMoviesImg(newMovies);
            setPopularMovies(popularMovies);
            setPopularTv(popularTv);
            setFamilyMovies(familyMovies);
            setDocumentry(documentry);
        }).catch(err => {
            setError(err);
        })

    }, []);

    return (
        <React.Fragment>
            <ScrollView>
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

            <View style={styles.carousel}>
                <List content={popularTv} title="Popular TV Shows" />
            </View>

            <View style={styles.carousel}>
                <List content={familyMovies} title="Family Movies" />
            </View>

            <View style={styles.carousel}>
                <List content={documentry} title="Documentary" />
            </View>
            </ScrollView>
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