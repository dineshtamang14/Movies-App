import React from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text} from 'react-native'
import Card from './Card';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    content: PropTypes.object
};
class List extends React.PureComponent {
    render() {
        const {title, content} = this.props
        return (
            <View style={styles.list}>
                <View>
                    <Text style={styles.text}>{title}</Text>
                </View>

                <View>
                <FlatList
                    horizontal={true}
                    data={content}
                    renderItem={({item}) => <Card item={item}/>}
                >
                </FlatList>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        marginTop: 25,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 20,
    }
})

List.prototype = propTypes;
export default List;