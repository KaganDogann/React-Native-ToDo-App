import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddToDoComponent = () => {
  //console.log('AddToDoComponent girdi');
  return (
    <TouchableOpacity
          onPress={() => addToDo()}
          >
          <Text style={{ color: '#fff', fontSize: 42 }}>+</Text>
        </TouchableOpacity>
  );
};

export default AddToDoComponent;
