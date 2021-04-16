import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';

import * as firebase from 'firebase';

import { Form, Item, Input, Label, Button,Icon } from 'native-base';


export default class SignInScreen extends React.Component {

    static navigationOptions = {
        title: "Sign In",
        headerShown: false,

    }

    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            passShowHide: true
        };
    };

    signInUser = (email, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                if (email==='queen@gmail.com') {
                    this.props.navigation.replace("TeachersHome")
                } else {
                    this.props.navigation.replace("StudentsHome")
                }
                
            })
            .catch(err => {
                alert(err.message)
            })
    }
    togglePaswordField = (showHidePass) => {
        this.setState({ passShowHide: !showHidePass })
    }
    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                    enabled
                >
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/logo.png')} />
                    </View>
                    <Form>
                        <Item style={styles.form}>
                            <Label>
                                Email
                        </Label>
                            <Input floatinglabel
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onChangeText={email => this.setState({
                                    email
                                })}
                            />
                        </Item>
                        <Item style={styles.passInput}>
                            <Label>
                                Password
                        </Label>
                            <TextInput floatinglabel
                                style={styles.passInput}
                                secureTextEntry={this.state.passShowHide}
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="default"
                                onChangeText={password => this.setState({
                                    password
                                })}
                            />
                            <TouchableOpacity onPress={() => {
                                this.togglePaswordField(this.state.passShowHide)
                            }}>
                                <Icon name='eye' style={styles.passIcon} />
                            </TouchableOpacity>
                        </Item>
                        <Button
                            full
                            rounded
                            style={styles.button}
                            onPress={() => {
                                this.signInUser(this.state.email, this.state.password)
                            }}
                        >
                            <Text style={styles.buttonText}>Sign In</Text>
                        </Button>
                    </Form>
                    <View style={styles.footer}>
                        <Text> OR </Text>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate("SignUp")
                        }}>
                            <Text style={styles.footerText}>Create new account </Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 50
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 100,
        marginBottom: 100
    },
    form: {
        padding: 20,
        width: "100%",
        marginBottom: 30
    },
    button: {
        marginTop: 20
    },
    buttonText: {
        color: "#fff"
    },
    footer: {
        padding: 20,
        alignItems: "center",
    },
    footerText: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    passInput: {
        flex: 2,
        paddingHorizontal: 20,
        width: "100%",
        padding: 10,
        alignSelf: "flex-start",
    }, passIcon: {
        alignItems: "center",
        margin: 10,
        flex: 1,
        fontSize: 30,
        flexDirection: "row-reverse",
        color: '#384850',
    },


});
