import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native';
import { Input, Card, Button, Icon } from 'native-base';
import * as firebase from 'firebase';





export default class StudentsHomeScreen extends React.Component {

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


    updateList = messageList => {
        this.setState({ messageList: messageList });
        console.log(messageList)
    }

    componentWillMount() {
        var self = this;
        var messageListRef = firebase.database().ref("messageList");
        messageListRef.on("value", dataSnapshot => {
            if (dataSnapshot.val()) {
                let messageList = Object.values(dataSnapshot.val());
                self.updateList(messageList.reverse());
                console.log(messageList)
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


    render() {
        return (
            <KeyboardAvoidingView behaviour="padding" enabled style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Hi Student {this.state.name} </Text>
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
                                <Card style={styles.listItem}>
                                    <Text style={styles.messageText}>{item.text}</Text>
                                    <View style={styles.dateTime}>
                                        <Text style={styles.timeText}>{new Date(item.time).toLocaleTimeString()}</Text>
                                        <Text style={styles.dateText}>{new Date(item.time).toLocaleDateString()}</Text>
                                    </View>
                                </Card>
                            )
                        }
                    >

                    </FlatList>
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
        backgroundColor: "orange"
    },
    header: {
        flexDirection: "row",
        backgroundColor: "#2B2B52",
        alignItems: "center",
        height: 40,  
    },
    headerProfileIcon: {
        paddingHorizontal:25,
        color: "#FFF",
    },
    headerText: {
        flex:1,
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

