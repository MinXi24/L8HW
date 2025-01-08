import React, { useState } from 'react';
import { TextInput, View, Text, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Add = ({ navigation,route }) => {
    const [name, setName] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copy, setCopy] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('Horror');

    const setData = async (value) => {
        AsyncStorage.setItem("bookdata",value);
        navigation.navigate("Home")
    }

    return (
        <View style={{ padding: 10 }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Title:</Text>
                <TextInput
                    style={{ borderWidth: 1}}
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>ISBN: </Text>
                <TextInput
                    style={{ borderWidth: 1}}
                    onChangeText={(text) => setIsbn(text)}
                />
            </View>

                <View style={{ padding: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Copies:</Text>
                    <TextInput
                        style={{ borderWidth: 1}}
                        onChangeText={(text) => setCopy(text)}
                    />
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Image URL: </Text>
                <TextInput
                    style={{ borderWidth: 1}}
                    onChangeText={(uri) => setImage(uri)}
                    value={image}
                />
            </View>
            <View style={{ padding: 10 }}>
                <RNPickerSelect
                    value={category}
                    onValueChange={(value) => setCategory(value)}
                    items={[
                        { label: 'Horror', value: 'Horror' },
                        { label: 'Adventure', value: 'Adventure' },
                        { label: 'Crime', value: 'Crime' },
                    ]}
                />
            </View>
            <Button
                title="ADD"
                onPress={() => {
                    let mydata = JSON.parse(route.params.datastring);
                    const item = { name, isbn, copy, imageUrl: image };
                    let indexNum = 2;
                    if (category === 'Horror') {
                        indexNum = 1;
                    } else if (category === 'Crime') {
                        indexNum = 0;
                    }
                    mydata[indexNum].data.push(item);
                    let stringdata = JSON.stringify(mydata);
                    setData(stringdata);
                    //navigation.navigate('Home');
                }}
            />
        </View>
    );
};

export default Add;
