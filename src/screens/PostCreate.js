import React, { useState } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { actions } from '../store';

const { height, width } = Dimensions.get('window');


const PostCreate = (props) => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const send = () => {
        ///VALIDATIONS
        props.createPost({ title, body }).then(() => {
            props.navigation.goBack();
        });
    }
    return (
        <SafeAreaView>
            <ImageBackground
                style={styles.content}
                source={require('../assets/images/fondo.jpg')}
            >
                <Input
                    placeholder='Title'
                    inputContainerStyle={{
                        width: width * 0.8, alignItems: 'flex-start',
                        alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.5)', pading: 15
                    }}
                    inputStyle={{ color: 'white', marginLeft: 15 }}
                    placeholderTextColor='#ccc'
                    value={title}
                    onChangeText={(value) => setTitle(value)}
                />
                <Input
                    placeholder='Description'
                    inputContainerStyle={{
                        width: width * 0.8, alignItems: 'flex-start',
                        alignSelf: 'center', height: height * 0.4, backgroundColor: 'rgba(0,0,0,0.5)',
                        pading: 15
                    }}
                    inputStyle={{ color: 'white', marginLeft: 15 }}
                    placeholderTextColor='#ccc'
                    value={body}
                    onChangeText={(value) => setBody(value)}
                    multiline
                    numberOfLines={2}
                />
                <Button title='Post' onPress={() => send()}
                    style={{ width: width * 0.8 }} />
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    content: {
        height,
        width,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapDispatchToProps = dispatch => ({
    createPost: (data) =>
        dispatch(actions.posts.createPost(data)),
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)((PostCreate));













