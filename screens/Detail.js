import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, ScrollView, Image, Dimensions, ActivityIndicator, View, Modal, Pressable } from 'react-native';
import {getMovie} from '../services/services';
import StarRating from 'react-native-star-rating';
import dateformat from "dateformat";
import PlayButton from '../components/PlayButton';
import VideoPlayer from 'react-native-video-controls';


const placeholderImg = require('../assets/images/placeholder.jpeg');
const height = Dimensions.get('screen').height;

const Detail = ({ route, navigation }) => {
    const movieId = route.params.movieId;
    const [movieDetail, setMovieDetail] = useState();
    const [loaded, setLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getMovie(movieId).then(movieData => {
            setMovieDetail(movieData);
            setLoaded(true);
        })
    }, [movieId]);

    const videoShown = () => {
        setModalVisible(!modalVisible);
    }

    return (
        <React.Fragment>
            {loaded && (
                <View>
                <ScrollView>
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
                <View style={styles.playButton}>
                    <PlayButton handlePress={videoShown} />
                </View>

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
                    disabled={true}
                    starSize={30}
                    rating={movieDetail.vote_average / 2}
                    fullStarColor={'gold'}
                />
                <Text style={styles.overview}>{movieDetail.overview}</Text>
                <Text style={styles.release}>{'Release date: ' + dateformat(movieDetail.release_date, 'mmmm dS, yyyy')}</Text>
                </View>
                
            </ScrollView>
            <Modal
                animationType='slide'
                visible={modalVisible}
            >
            <View style={styles.videoModal}>
                <VideoPlayer
                    source={{uri: "https://vjs.zencdn.net/v/oceans.mp4"}}
                />
            </View>
            </Modal>
            </View>
            )}
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
        marginBottom: 20,
    },
    genre: {
        color: 'black',
        marginRight: 10,
        fontWeight: 'bold',
    },
    overview: {
        color: 'black',
        padding: 15,
    },
    release: {
        color: 'black',
        fontWeight: 'bold',
    },
    playButton: {
        position: 'absolute',
        top: -25,
        right: 20
    },
    videoModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Detail;