import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { addTaskToDoing, removeTaskToDoing } from "../store/actions/doingActions";
import { addTaskToDone } from "../store/actions/doneActions";
import { removeToToDo } from "../store/actions/toDoActions";
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth, { firebase } from '@react-native-firebase/auth';
//console.log('ItemModalComponent girdi 2');

const ItemModalComponent = ({ task, modalVisible, onClose, type, setModalVisible }) => {
    //const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    console.log("ItemModalComponent içi task:", task);

    const [userId, setUserId] = useState(null)
    //const [userSession, setUserSession] = useState(null)
    useEffect(() => {
            auth().onAuthStateChanged(user => {
                //setUserSession(!!user);
                //setUserId(user.uid)
                console.log("girdi mitest")
            });
    }, [userId])


    const handleSendTaskToDoing = () => {

        database().ref(userId + '/todo/' + task.id).remove();
        const newReference = database().ref(userId + '/doing/').push();
        newReference
            .set({
                content: task.content,
            })
            .then(() => console.log('Data updated.'));
    }




    const handleSendTaskToDone = () => {
        // dispatch(addTaskToDone(task))
        // dispatch(removeToToDo(task))
        // dispatch(removeTaskToDoing(task))
        database().ref(userId + '/todo/' + task.id).remove();
        database().ref(userId + '/doing/' + task.id).remove();

        const newReference = database().ref(userId + '/done').push();
        newReference
            .set({
                content: task.content,
            })
            .then(() => console.log('Data updated.'));
    }
    return (

        <View style={styles.centeredView}

        >
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}

                onBackdropPress={() => setModalVisible(false)}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>{task.content}</Text>
                        {type === "ToDo" ? (<View style={styles.buttonsView}>

                            <Pressable
                                style={[styles.button, styles.buttonClose1]}
                                onPress={() => { onClose(); handleSendTaskToDoing() }}
                            >
                                <Text style={styles.textStyle}>Doing</Text>
                            </Pressable>
                            <Text>             </Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose2]}
                                onPress={() => { onClose(); handleSendTaskToDone() }}
                            >
                                <Text style={styles.textStyle}>Done</Text>
                            </Pressable>
                        </View>) : (<Pressable
                            style={[styles.button, styles.buttonClose2]}
                            onPress={() => { onClose(); handleSendTaskToDone() }}
                        >
                            <Text style={styles.textStyle}>Done</Text>
                        </Pressable>)}
                        <Pressable>
                            {/* <Icon
                                style={{position:"absolute",
                                    top:-110,
                                    right:-100,
                                    marginTop:3
                                }}
                                onPress={()=>setModalVisible(false)}
                                name="close-octagon-outline"
                                color={"red"}
                                size={36}
                                >

                                </Icon> */}

                        </Pressable>

                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",

        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    test: {
        padding: 50,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose1: {
        backgroundColor: "#add8e6",
    },
    buttonClose2: {
        backgroundColor: "#8fbc8f",
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "black",
        fontSize: 18
    },
    buttonsView: {
        flexDirection: "row",
    }
});

export default ItemModalComponent;