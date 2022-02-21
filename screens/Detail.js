import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, ScrollView, Image, Dimensions, ActivityIndicator, View } from 'react-native';
import {getMovie} from '../services/services';
import StarRating from 'react-native-star-rating';


const placeholderImg = require('../assets/images/placeholder.jpeg');
const height = Dimensions.get('screen').height;

const Detail = ({ route, navigation }) => {
    const movieId = route.params.movieId;
    const [movieDetail, setMovieDetail] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getMovie(movieId).then(movieData => {
            setMovieDetail(movieData);
            setLoaded(true);
        })
    }, [movieId]);

    return (
        <React.Fragment>
            {loaded && (<ScrollView>
            <Image 
                    resizeMode='cover'
                    style={styles.image}
                    source={
                        movieDetail.poster_path
                        ? {uri: 'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path}
                        : placeholderImg
                    }
                />
                <View style={styles.container}>
                <Text style={styles.movieTitle}>{movieDetail.title}</Text>
                {movieDetail.genres && (
                    <View style={styles.genresContainer}>
                        {movieDetail.genres.map(genre => {
                            return (<Text key={genre.id} style={styles.genre}>{genre.name}</Text>)
                        })}
                    </View>
                )}
                <StarRating 
                    maxStars={5}
                    rating={movieDetail.vote_average / 2}
                />
                </View>
                
            </ScrollView>)}
            {!loaded && <ActivityIndicator size="large" />}
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: height / 2.5,
    },
    movieTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: 'black',
    },
    genresContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignContent: 'center',

    },
    genre: {
        color: 'black',
        marginRight: 10,
        fontWeight: 'bold',
    }
})

export default Detail;