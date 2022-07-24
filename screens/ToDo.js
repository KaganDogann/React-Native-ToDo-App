import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import ItemModalComponent from '../components/ItemModalComponent';
import { TouchableOpacity } from 'react-native';
import AddToDoComponent from '../components/AddToDoComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToToDo, removeToToDo } from '../store/actions/toDoActions';
import { AsyncStorage } from 'react-native';

Keyboard.dismiss();

const ToDo = () => {
  const { toDoItems } = useSelector((state) => state.toDo);
  const [itemVisuable, setItemVisuable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState({});
  const [item, setItem] = useState("")
  const dispatch = useDispatch();
  console.log("todoItems:",toDoItems)


  const renderItem = ({ item }) => (

    <TouchableOpacity
      onPress={() => {
        console.log("onPress çalıştı", item);
        setModalVisible(!modalVisible);
        setTask(item);
      }}
      onLongPress={() => {
        handleRemoveToDo(item)
      }}
    >
      <View style={styles.item}>
        <Text style={styles.title}>
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  )

  const handleRemoveToDo  = (item) => {
    dispatch(removeToToDo(item))
  }

  const handleAddToDo = () => {
    //console.log("handleadd to do item",item)
    //console.log({toDoItems})
   if (item.length<1) {
    Alert.alert("Lütfen boş alan girmeyiniz!")
   } else {
    dispatch(addToToDo(item));
    setItem("")
   }
  }

  return (
    <SafeAreaView
      SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffb6c1',
      }}>

      <View
        style={{
          flex: 1,
          marginTop: 10,
          padding: 10,
          width: '100%',
        }}>
        <View style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row"
        }}>
          <TextInput
            style={styles.formTaskTitle}
            multiline
            onChangeText={(item) => setItem(item)}
            maxLength={100}
            value={item}
            placeholder="Neler yapacaksın?"></TextInput>
          <Icon onPress={() => { handleAddToDo(); Keyboard.dismiss() }} style={{ margin: 2 }} name='plus-circle-outline' color="#bdb76b" size={54}></Icon>
        </View>



        <FlatList
          style={{
            marginTop: 15,
          }}
          data={toDoItems}
          renderItem={renderItem}></FlatList>



        <ItemModalComponent
          task={task}
          modalVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          type={"ToDo"}
        />

        {/* <AddToDoComponent/> */}

      </View>


    </SafeAreaView>
  );
};

export default ToDo;

const styles = StyleSheet.create({
  formTaskTitle: {
    width: '77%',
    padding: 10,
    borderRadius: 10,

    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 20,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    fontSize: 20,
    shadowOpacity: 0.3,
    shadowRadius: 1.25,
    elevation: 1,
  },

  formTaskTitleInput: {
    paddingHorizontal: 20,
  },

  item: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,

    borderRadius: 15,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
});
