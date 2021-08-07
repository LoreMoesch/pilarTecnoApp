import React, { Component } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Text,
    ActivityIndicator,
    FlatList,
    View,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import { Button, Divider, withTheme } from 'react-native-elements'
import { actions } from '../store'
import { connect } from 'react-redux'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: this.setState.item,
        }
    }

    componentDidMount = () => {
        this.props.getPosts();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() =>
            this.props.navigation.navigate('PostDetail', { item })} >
            <View style={{
                margin: 20, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 8,
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
    )

    render() {
        return (
            <SafeAreaView style={{
                flex: 1, justifyContent: 'center', alignItems: 'center',

            }}>
                {
                    !this.props.posts ?
                        <ActivityIndicator />
                        :
                        <ImageBackground
                            style={{ height, width, paddingTop: height / 9 }}
                            source={require('../assets/images/fondo.jpg')}
                        >
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('PostCreate')}
                                    style={[
                                        styles.button,
                                    ]}
                                >
                                    <Text>Create Post</Text>
                                </TouchableOpacity>
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.props.posts.reverse()}
                                    renderItem={this.renderItem}

                                />
                            </View>
                        </ImageBackground>
                }
            </SafeAreaView>
        )
    }
}
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
    },
    button: {
        backgroundColor: 'rgba(165, 105, 189, 0.5)',
        margin: width / 20,
        width: width / 2,
        marginLeft: 90,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});
const mapDispatchToProps = dispatch => ({
    getPosts: () =>
        dispatch(actions.posts.getPosts()),
})
const mapStateToProps = state => ({
    posts: state.posts.posts,
})
export default connect(mapStateToProps, mapDispatchToProps)((Posts))