import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Detail = ({ route, navigation }) => {
    const movieDetail = route.params.movieDetail;
    return (
        <React.Fragment>
            <Text style={styles.detail}>{movieDetail.title}</Text>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    detail: {
        color: 'black'
    }
})

export default Detail;