import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import ItemModalComponent from '../components/ItemModalComponent';
import {useDispatch, useSelector} from 'react-redux';
import {removeTaskToDoing} from '../store/actions/doingActions';
import database from '@react-native-firebase/database';
import parseContentData from '../utils/parseContentData';
import auth from '@react-native-firebase/auth';

const Doing = () => {
  const [itemVisuable, setItemVisuable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState({});
  //const {doingItems} = useSelector(state => state.doing);
  const [doingItems, setDoingItems] = useState([])
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null)
  //console.log("doingItems :", doingItems)

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(!modalVisible);
        setTask(item);
      }}
      onLongPress={() => {
        handleRemoveTaskToDoing(item);
      }}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );
  const handleRemoveTaskToDoing = item => {
    //dispatch(removeTaskToDoing(item));
    database().ref(userId+'/doing/' + item.id).remove();
  };

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      //setUserId(user.uid)
      //console.log(user.uid)
     //console.log("USER SESSION TEST!",userSession)
    });

    database()
    .ref(userId+'/doing')
    .on('value', snapshot => {
      //console.log('Todo Items: ', snapshot.val());
      let contentData = snapshot.val();

      const parsedData = parseContentData(contentData || {});
      setDoingItems(parsedData);
      //console.log('parsedData', parsedData);
    });
  }, [userId]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#add8e6'}}>
      <FlatList
        style={{
          marginTop: 15,
        }}
        data={doingItems}
        renderItem={renderItem}></FlatList>

      <ItemModalComponent
        task={task}
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        setModalVisible={setModalVisible}
        type={'Doing'}
      />
    </SafeAreaView>
  );
};

export default Doing;

const styles = StyleSheet.create({
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
