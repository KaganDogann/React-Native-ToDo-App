import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {removeTaskToDone} from '../store/actions/doneActions';
import parseContentData from '../utils/parseContentData';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Done = () => {
  //const { doneItems } = useSelector((state) => state.done);
  const [doneItems, setDoneItems] = useState([]);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null)
  const renderItem = ({item}) => (
    <TouchableOpacity
      onLongPress={() => {
        handleRemoveTaskToDone(item);
      }}>
      <Item content={item.content}></Item>
    </TouchableOpacity>
  );

  const Item = ({content}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{content}</Text>
    </View>
  );

  const handleRemoveTaskToDone = item => {
    //dispatch(removeTaskToDone(item))

    database()
      .ref(userId+'/done/' + item.id)
      .remove();
  };

  useEffect(() => {
    //console.log('addasd');

    auth().onAuthStateChanged(user => {
      //setUserId(user.uid)
      //console.log(user.uid)
     //console.log("USER SESSION TEST!",userSession)
    });

    database()
      .ref(userId+'/done')
      .on('value', snapshot => {
        //console.log('Todo Items: ', snapshot.val());
        let contentData = snapshot.val();

        const parsedData = parseContentData(contentData || {});
        setDoneItems(parsedData);
        //console.log('parsedData', parsedData);
      });
  }, [userId]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#8fbc8f'}}>
      <FlatList data={doneItems} renderItem={renderItem}></FlatList>
    </SafeAreaView>
  );
};

export default Done;

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
