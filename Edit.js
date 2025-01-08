import React, { useState } from 'react';
import { TextInput, View, Text, Button, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({ navigation, route }) => {

    let mydata = JSON.parse(route.params.datastring);
    let myindex = route.params.index;

    const [name,setName] = useState(route.params.name);
    const [isbn,setIsbn] = useState(route.params.isbn);
    const [copy,setCopy] = useState(route.params.copy);

    const setData = async (value) => {
        AsyncStorage.setItem("bookdata",value);
        navigation.navigate("Home")
    }

    return(
        <View style ={{padding:10}}>
            <Text>Name:</Text>
            <TextInput value={name} style={{borderWidth:1}} onChangeText={(text)=>setName(text)}/>
            <Text>Isbn:</Text>
            <TextInput value={isbn} style={{borderWidth:1}} onChangeText={(text)=>setIsbn(text)}/>
            <Text>Copies:</Text>
            <TextInput value={copy} style={{borderWidth:1}} onChangeText={(text)=>setCopy(text)}/>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{margin:10,flex:1}}>
                    <Button title='SAVE'
                            onPress={()=>{
                                let indexNum = 2
                                if (route.params.type==="Horror"){
                                    indexNum = 1;
                                } else if (route.params.type==="Crime") {
                                    indexNum = 0;
                                }
                                mydata[indexNum].data[myindex].name = name;
                                mydata[indexNum].data[myindex].isbn = isbn;
                                mydata[indexNum].data[myindex].copy = copy;

                                let stringdata = JSON.stringify(mydata);
                                setData(stringdata);
                            }
                            }
                    />
                </View>
                <View style={{margin:10,flex:1}}>
                    <Button title='DELETE'
                            onPress={()=>{
                                let indexNum = 2
                                if (route.params.type==="Horror"){
                                    indexNum = 1;
                                } else if (route.params.type==="Crime") {
                                    indexNum = 0;
                                }
                                Alert.alert("Confirmed?",'',
                                    [{text:'Yes', onPress:()=>{
                                            mydata[indexNum].data.splice([myindex],1);
                                            let stringdata = JSON.stringify(mydata);
                                            setData(stringdata);
                                        }},
                                        {text:'No'}])

                            }
                            }
                    />
                </View>
            </View>
        </View>
    );
};


export default Edit;
