import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';

import * as firebase from 'firebase';


export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: "Home",
        headerShown: true
    };

    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            id:""
        };
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(authenticate => {
            if (authenticate) {
                this.setState({
                    email: authenticate.email,
                    name: authenticate.displayName,
                    id: authenticate.uid
                })
            } else {
                this.props.navigation.replace("SignIn")
            }
        })
    }

    signOutUser = () => {
        firebase
            .auth()
            .signOut()
            .then(()=>{console.log("Signed out")})
            .catch(err => {alert(err)})
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/logo.png')} />
                </View>
                <View style={styles.userDetails}>
                    <Text>Hey {this.state.name}</Text>
                    <Text>Signed in as {this.state.email}</Text>
                    <Text>Use Id : {this.state.id}</Text>
                </View>
                <Button style={styles.button}
                    full
                    rounded
                    success
                    onPress={() => {this.signOutUser() }}
                >
                    <Text style={styles.buttonText}>Sign Out</Text>
                </Button>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        margin: 20
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 100,
        marginBottom: 100
    },
    userDetails: {},

    button: {
        marginTop: 20
    },
    buttonText: {
        color: "#fff"
    }
});