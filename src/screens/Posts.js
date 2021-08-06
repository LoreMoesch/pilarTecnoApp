import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Text,
    ActivityIndicator,
    FlatList,
    View,
    ImageBackground
} from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { actions } from '../store';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

const Posts = (props) => {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        props.getPosts();
    }, []);

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() =>
            props.navigation.navigate('PostDetail', { item })} >
            <View style={{
                margin: 20,
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 8,
                padding: 5,
            }}>
                <View style={styles.titlecontainer}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                </View>
                <Divider />
                <View style={styles.bodycontainer}>
                    <Text style={styles.text}>
                        {item.body}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
    props.posts ? console.log(props.posts.length) : console.log('empty list.');
    return (
        <SafeAreaView style={{
            justifyContent: 'center', alignItems: 'center',
            backgroundColor: 'white'
        }}>
            {
                !props.posts ?
                    <ActivityIndicator />
                    :
                    <ImageBackground
                        style={{ height, width, paddingTop: height / 7 }}
                        source={require('../assets/images/fondo.jpg')}
                    >
                        <View style={{ flex: 1 }}>
                            <Button title='Create a New Post'
                                onPress={() => props.navigation.navigate('PostCreate')} />
                            <FlatList
                                style={{ marginBottom: 50 }}
                                keyExtractor={keyExtractor}
                                data={props.posts.reverse()}
                                renderItem={renderItem}
                            />
                        </View>
                    </ImageBackground>
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    titlecontainer: {
        padding: 10
    },
    bodycontainer: {
        padding: 10
    },
    content: {
        margin: width / 20,
        height: width / 2.5,
        width: width / 2.5,
        borderRadius: 15,
        justifyContent: 'center',
    }
});

const mapDispatchToProps = dispatch => ({
    getPosts: () =>
        dispatch(actions.posts.getPosts()),
});

const mapStateToProps = state => ({
    posts: state.posts.posts,
});

export default connect(mapStateToProps, mapDispatchToProps)((Posts));