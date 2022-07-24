import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux';
import { removeTaskToDone } from '../store/actions/doneActions';

const Done = () => {

    const { doneItems } = useSelector((state) => state.done);
    const dispatch = useDispatch();



    const renderItem = ({ item }) => (
        <TouchableOpacity onLongPress={() => {
            handleRemoveTaskToDone(item)
        }}>
            <Item content={item.content}></Item>
        </TouchableOpacity>
        

    )

    const Item = ({ content }) => (

        <View
            style={styles.item}
        >
            <Text
                style={styles.title}
            >
                {content}
            </Text>
        </View>

    )

    const handleRemoveTaskToDone = (item) => {
        dispatch(removeTaskToDone(item))
    }

  return (
    <SafeAreaView 
    style={{flex:1, backgroundColor:"#8fbc8f"}}
    >
        <FlatList
        data={doneItems}
        renderItem={renderItem}
        >

        </FlatList>
    </SafeAreaView>
  )
}

export default Done

const styles = StyleSheet.create({

    item: {
        alignItems:'flex-start',
        justifyContent:'flex-start',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth:1,
        
        borderRadius:15,
        backgroundColor:"#f0f8ff"
        
    },
    title: {
        fontSize: 20,
       color:"black"
    },


})