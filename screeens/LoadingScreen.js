import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image ,ActivityIndicator} from 'react-native';


import * as firebase from 'firebase';


export default class LoadingScreen extends React.Component {

    static navigationOptions = {
        title: "Loading",
        headerShown: false
    };


    componentDidMount() {
        firebase.auth().onAuthStateChanged((authenticate) => {
            if (authenticate) {
                if (authenticate.email==='queen@gmail.com') {
                    this.props.navigation.replace("TeachersHome")
                } else {
                    this.props.navigation.replace("StudentsHome")
                }
            } else {
                this.props.navigation.replace("SignIn")
            }
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
          </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },



});