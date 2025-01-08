import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {datasource} from "./Data.js"
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#2196F3',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    sectionIcon: {
        marginLeft: 8,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 140,
        borderRadius: 4,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    isbn: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 4,
    },
    copy: {
        fontSize: 14,
        color: 'black',
    },
});

const Home = ({navigation}) => {

    const [mydata,setMyData] = useState([]);

    const getData = async() => {
        let datastr = await AsyncStorage.getItem('bookdata');
        if (datastr != null) {
            let jsondata = JSON.parse(datastr);
            setMyData(jsondata);
        }
        else{
            setMyData(datasource);
        }
    };
    getData();

    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity style={styles.itemContainer}
                              onPress ={() =>
                              {
                                  let datastr = JSON.stringify(mydata)
                                  navigation.navigate('Edit', {index:index,type:section.category,name:item.name, icon:item.icon, isbn:item.isbn,copy:item.copy, img:item.imageUrl,datastring:datastr });
                              }
                              }
            >
                <Image
                    source={{uri:item.imageUrl}}
                    style={styles.image}/>
                <View style={styles.textContainer}>
                <Text style={styles.name}>Name: {item.name}</Text>
                <Text style={styles.isbn}>Isbn: {item.isbn}</Text>
                <Text style={styles.name}>Copies: {item.copy}</Text>
                </View>


            </TouchableOpacity>
        );
    };
    return (
        <View>
            <StatusBar/>
            <Button title='Add Book'
                    onPress={() => {
                        let datastr = JSON.stringify(mydata);
                        navigation.navigate("Add",{datastring:datastr});
                    }}
            />
            <SectionList sections={mydata} renderItem={renderItem}
                         renderSectionHeader={({section:{category,icon,bgcolor}})=>(
                             <View style={[styles.sectionHeader, { backgroundColor: bgcolor }]}>
                                 <Text style={styles.sectionTitle}>{category}</Text>
                                 <Icon
                                     name={icon}
                                     size={30}
                                     color="#fff"
                                     style={styles.sectionIcon}/>
                             </View>
                         )}/>
        </View>
    );
};

export default Home;
