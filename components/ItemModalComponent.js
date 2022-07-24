import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { addTaskToDoing, removeTaskToDoing } from "../store/actions/doingActions";
import { addTaskToDone } from "../store/actions/doneActions";
import { removeToToDo } from "../store/actions/toDoActions";

//console.log('ItemModalComponent girdi 2');

const ItemModalComponent = ({ task, modalVisible, onClose, type }) => {
    //const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    console.log("ItemModalComponent içi task:",task);

    const handleSendTaskToDoing=( ) => {
        dispatch(addTaskToDoing(task))
        dispatch(removeToToDo(task))
    }

    const handleSendTaskToDone = () => {
        dispatch(addTaskToDone(task))
        dispatch(removeToToDo(task))
        dispatch(removeTaskToDoing(task))
    }
    return (

        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    onClose();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{task.content}</Text>
                        {type === "ToDo" ? (<View style={styles.buttonsView}>

                            <Pressable
                                style={[styles.button, styles.buttonClose1]}
                                onPress={() => {onClose(); handleSendTaskToDoing()}}
                            >
                                <Text style={styles.textStyle}>Doing</Text>
                            </Pressable>
                            <Text>             </Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose2]}
                                onPress={() => {onClose(); handleSendTaskToDone()}}
                            >
                                <Text style={styles.textStyle}>Done</Text>
                            </Pressable>
                        </View>) : (<Pressable
                            style={[styles.button, styles.buttonClose2]}
                            onPress={() => {onClose(); handleSendTaskToDone()}}
                        >
                            <Text style={styles.textStyle}>Done</Text>
                        </Pressable>)}


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