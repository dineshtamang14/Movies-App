import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { getPopularMovies, getUpcomingMovies, getPopularTv, getFamilyMovies, getDocumentry } from '../services/services'
import { SliderBox } from 'react-native-image-slider-box'
import List from '../components/List';
import Error from '../components/Error';


const dimensions = Dimensions.get('screen');
const Home = () => {
    const [moviesImg, setMoviesImg] = useState();
    const [popularMovies, setPopularMovies] = useState();
    const [popularTv, setPopularTv] = useState();
    const [familyMovies, setFamilyMovies] = useState();
    const [documentry, setDocumentry] = useState();
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

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
        }).catch(() => {
            setError(true);
        }).finally(() => {
            setLoaded(true);
        });

    }, []);

    return (
        <React.Fragment>
            {loaded && !error && (
                <ScrollView>
                {moviesImg && (
                <View style={styles.sliderContainer}>
                <SliderBox 
                    images={moviesImg} 
                    autoplay={true} 
                    dotStyle={styles.sliderStyle}
                    circleLoop={true} 
                    sliderBoxHeight={dimensions.height / 1.5}
                />
            </View>
            )}

            {popularMovies && (
                <View style={styles.carousel}>
                <List content={popularMovies} title="Popular Movies" />
            </View>
            )}

            {popularTv && (
                <View style={styles.carousel}>
                <List content={popularTv} title="Popular TV Shows" />
            </View>
            )}

            {familyMovies && (
                <View style={styles.carousel}>
                <List content={familyMovies} title="Family Movies" />
            </View>
            )}

            {documentry && (
                <View style={styles.carousel}>
                <List content={documentry} title="Documentary" />
            </View>                
            )}

            </ScrollView>
            )}
            {!loaded && (<View style={styles.activityIndicator}>
			<ActivityIndicator size="large" color="#00ff00" />
      	</View>)}
          {error && <Error errorText1="Oops! Something went wrong." errorText2="Make sure you are online and restart the App!" />}
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
    },
    activityIndicator: {
        flex: 1,
        justifyContent: "center",
    }
})

export default Home;