import React, { Component } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { actions } from '../store'
import { connect } from 'react-redux'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

class PostDetail extends React.Component {
    constructor(props) {
        super(props);

    }
    _delPost = () => {
        const { item } = this.props.route.params;
        const { id } = item;
        ///VALIDACIONES
        this.props.delPost({ id }).then(() => {
            this.props.navigation.goBack()
        })
    }


    render() {
        const { item } = this.props.route.params;
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground
                    style={{ height }}
                    source={require('../assets/images/fondo.jpg')}
                >
                    <View style={{
                        margin: 20,
                        padding: 5,
                        marginTop: 20
                    }}>
                        <View style={{ marginTop: 50, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 8 }}>
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
                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('PostEdit', { item })}
                        style={[styles.button,]}
                    >
                        <Text>Edit Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._delPost()}
                        style={[styles.button,]}
                    >
                        <Text>Delete Post</Text>
                    </TouchableOpacity>

                </ImageBackground>
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
        padding: 10,
    },
    bodycontainer: {
        padding: 10,
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
})
const mapDispatchToProps = dispatch => ({
    delPost: (data) =>
        dispatch(actions.posts.delPost(data)),
})
const mapStateToProps = state => ({

})
export default connect(mapStateToProps, mapDispatchToProps)((PostDetail))