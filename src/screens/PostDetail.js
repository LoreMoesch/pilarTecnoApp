import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ImageBackground,
    View,
    Text,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import { fetchComments } from '../api';
import { connect } from 'react-redux';
import { actions } from '../store';
import { Divider, Button } from 'react-native-elements';

const { height, width } = Dimensions.get('window');

const PostDetail = (props) => {

    const [comments, setcomments] = useState([]);

    const { item } = props.route.params;

    useEffect(() => {
        const { id } = item;
        fetchComments({ id }).then(res => {
            // console.log(`-----------RESPONSE: ${JSON.stringify(res[1])}`);
            setcomments(res[1]);
        });
    }, []);

    const delPost = () => {
        const { id } = item;
        props.delPost({ id }).then(res => {
            props.navigation.goBack();
        });
    }

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (
        <View style={{
            margin: 20, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 8,
            padding: 5,
        }}>
            <View style={styles.titlecontainer}>
                <Text style={styles.title}>
                    {item.name}
                </Text>
            </View>
            <View style={styles.bodycontainer}>
                <Text style={styles.text}>
                    {item.email}
                </Text>
            </View>
            <View style={styles.bodycontainer}>
                <Text style={styles.text}>
                    {item.body}
                </Text>
            </View>
            <Divider />
        </View>
    );

    return (
        <SafeAreaView>
            <ImageBackground
                style={{
                    height,
                    alignItems: 'center',
                }}
                source={require('../assets/images/fondo.jpg')}
            >
                <View style={{
                    marginTop: height / 8, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 8,
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
                <View style={{ flexDirection: 'row', marginVertical: 10 }} >
                    <View style={{ width: width / 3, marginHorizontal: 10 }} >
                        <Button
                            title='Edit'
                            onPress={() => props.navigation.navigate('PostEdit', { item })}
                        />
                    </View>
                    <View style={{ width: width / 3, marginHorizontal: 10 }} >
                        <Button
                            title='Delete'
                            onPress={() => delPost()}
                        />
                    </View>
                </View>
                {
                    !comments ?
                        <ActivityIndicator />
                        :
                        <View style={{ flex: 1 }}>
                            <FlatList
                                style={{ marginBottom: 50 }}
                                keyExtractor={keyExtractor}
                                data={comments}
                                renderItem={renderItem}
                            />
                        </View>
                }
            </ImageBackground>
        </SafeAreaView>
    );
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
    }
});

const mapDispatchToProps = dispatch => ({
    delPost: (data) =>
        dispatch(actions.posts.delPost(data)),
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)((PostDetail));

