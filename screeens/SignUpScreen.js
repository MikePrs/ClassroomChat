import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';
import { Form, Item, Input, Label, InputGroup, Button, Icon } from 'native-base';



export default class SignUpScreen extends React.Component {

    static navigationOptions = {
        title: "Sign Up",
        headerShown: false,

    };

    constructor(props) {
        super(props)

        this.state = {
            emai: "",
            password: "",
            name: "",
            passShowHide: true
        };
    };

    SignUpUser = (name, email, password) => {
        try {
            firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(authenticate => {
                console.log(authenticate)
                return authenticate.user
                    .updateProfile({
                        displayName: name
                    })
                    .then(() => {
                        this.props.navigation.replace("Home");
                    }
                    )
            })
            .catch(err => {
                alert(err.message)
            })
        } catch (err) {
            alert("Fill all required fields")
        }
       
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
                                Name
                        </Label>
                            <InputGroup borderType='regular'>
                                <Input floatinglabel
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    keyboardType="name-phone-pad"
                                    onChangeText={name => this.setState({
                                        name
                                    })}
                                />
                            </InputGroup>
                        </Item>
                        <Item style={styles.form}>
                            <Label>
                                Email
                        </Label>
                            <InputGroup borderType='regular'>

                                <Input floatinglabel
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    onChangeText={email => this.setState({
                                        email
                                    })}
                                />
                            </InputGroup>
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
                                this.SignUpUser(this.state.name, this.state.email, this.state.password)
                            }}
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Button>
                    </Form>
                    <View style={styles.footer}>
                        <Text> OR </Text>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate("SignIn")
                        }}>
                            <Text style={styles.footerText} >Sign in</Text>
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
        marginTop: 50,
        marginBottom: 50
    },
    form: {
        padding: 10,
        paddingHorizontal: 20,
        width: "100%"
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
        flex:2,
        paddingHorizontal: 20,
        width: "100%",
        padding: 10,
        alignSelf: "flex-start",
    }, passIcon: {
        alignItems: "center",
        margin:10,
        flex: 1,
        fontSize: 30,
        flexDirection: "row-reverse",
        color: '#384850',
    },

});