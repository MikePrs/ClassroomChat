import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, FlatList, KeyboardAvoidingView, Alert } from 'react-native';
import { Input, Card, Button, Icon } from 'native-base';
import * as firebase from 'firebase';




export default class TeachersHomeScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            message: "",
            messageList: [],
            email: "",
            name: "",
            id: ""
        };
    };


    static navigationOptions = {
        headerShown: false
    };

    sendMessage = (message) => {
        var messageListRef = firebase.database().ref("messageList")
        var newMessageRef = messageListRef.push();
        
        newMessageRef.set({
            text: message,
            time: Date.now(),
        })
        this.setState({ message: "" });
    };

    updateList = messageList => {
        this.setState({ messageList: messageList });
    }

    componentDidMount() {
        var self = this;
        var messageListRef = firebase.database().ref("messageList");
        messageListRef.on("value", dataSnapshot => {
    
            if (dataSnapshot.val()) {
                let messageList = Object.values(dataSnapshot.val());
                self.updateList(messageList.reverse());
            }


            
        })


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

    deleteMessage = (item) => {

        Alert.alert(
            "Delete",
            "Do you want to delete this message ?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        

                    }
                }
            ],
            { cancelable: false }
        );
    }


    render() {
        return (
            <KeyboardAvoidingView behaviour="padding" enabled style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Hi Teacher {this.state.name} </Text>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate("Home")
                    }}>
                        <Icon name='person' style={styles.headerProfileIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={this.state.messageList}
                        inverted
                        keyExtractor={(item, index) => item.time.toString()}
                        renderItem={
                            ({ item }) => (
                                <TouchableHighlight
                                    onLongPress={() => { this.deleteMessage(item) }}
                                >

                                    <Card style={styles.listItem}>
                                        <Text style={styles.messageText}>{item.text}</Text>
                                        <View style={styles.dateTime}>
                                            <Text style={styles.timeText}>{new Date(item.time).toLocaleTimeString()}</Text>
                                            <Text style={styles.dateText}>{new Date(item.time).toLocaleDateString()}</Text>
                                        </View>
                                    </Card>

                                </TouchableHighlight>
                            )
                        }
                    >

                    </FlatList>
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        onChangeText={text => {
                            this.setState({
                                message: text
                            })
                        }}
                        value={this.state.message}
                        placeholder="Enter Message"
                    />
                    <Button
                        danger
                        rounded
                        icon
                        onPress={() => {
                            this.sendMessage(this.state.message)
                        }}
                    >
                        <Icon name="arrow-forward" />
                    </Button>

                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
        margin: 2,
        backgroundColor: "#01CBC6"
    },
    header: {
        flexDirection: "row",
        backgroundColor: "#2B2B52",
        alignItems: "center",
        height: 40,
    },
    headerProfileIcon: {
        paddingHorizontal: 25,
        color: "#FFF",
    },
    headerText: {
        flex: 1,
        paddingHorizontal: 10,
        color: "#FFF",
        fontSize: 20,
        alignSelf: "center",
    },
    listContainer: {
        flex: 1,
        padding: 5
    },
    listItem: {
        padding: 10
    },
    messageText: {
        fontSize: 20
    },
    timeText: {
        flex: 6,
        alignSelf: "flex-start",
        fontSize: 10
    },
    inputContainer: {
        flexDirection: "row",
        padding: 5,
        borderWidth: 5,
        borderRadius: 15,
        borderColor: "#2B2B52",
        color: "#fff"
    },
    dateTime: {
        flexDirection: "row"
    },
    dateText: {
        flex: 1,
        alignSelf: "flex-end",
        fontSize: 10,


    }
});

