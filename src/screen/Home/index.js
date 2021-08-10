import React, { useState } from 'react';
import {
     ActivityIndicator,
     FlatList,
     StyleSheet,
     Text,
     View,
     TouchableOpacity,
     Image,
     TextInput

} from 'react-native';
import apiClient from '../../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Home = ({ navigation }) => {
     const [loader, setLoader] = useState(true);
     const [empList, setEmpList] = useState([]);
     const [tempList, setTempList] = useState([]);

     React.useEffect(() => {
          onFetchData();
     }, []);

     const navigateToDetail = (empDetail) => {
          navigation.navigate('Details', { empDetail: empDetail });
     };

     const onFetchData = async () => {
          setLoader(true);

          const empData = await getData();
          console.log('empData', empData)

          if (empData) {
               setLoader(false);
               setEmpList(empData)
               setTempList(empData)

          } else {
               apiClient.get('5d565297300000680030a986').then((data) => {
                    setEmpList(data.data)
                    setTempList(data.data)
                    storeData(data.data)
                    setLoader(false);
               }).catch((error) => {
                    setLoader(false);

               })
          }

     };
     const storeData = async (value) => {
          try {
               const jsonValue = JSON.stringify(value)
               await AsyncStorage.setItem('EMP_DETAILS', jsonValue)
          } catch (e) {
               // saving error
          }
     }

     const getData = async () => {
          try {
               const jsonValue = await AsyncStorage.getItem('EMP_DETAILS')
               return jsonValue != null ? JSON.parse(jsonValue) : null;
          } catch (e) {
               // error reading value
               return null;

          }
     }
     const onSearch = (text) => {
          text = (text) ? text.trim() : null;
          if (text) {
               let list = tempList.filter((item) => {

                    if (item.name.includes(text) || item.email.includes(text)) {
                         return true
                    }
               })
               setEmpList(list)

          } else {
               setEmpList(tempList)
          }

     };
     return (
          <View style={styles.container}>
               {loader ?
                    <ActivityIndicator size="large" color="#27AA3D" />
                    :
                    <View style={styles.containerItem}>
                         <TextInput
                              style={styles.input}
                              onChangeText={onSearch}
                              placeholder="Search"
                         />

                         <FlatList
                              data={empList}
                              renderItem={({ item, index }) => (
                                   <TouchableOpacity style={[styles.card, { borderColor: '#00BFFF' }]} onPress={() => { navigateToDetail(item) }}>
                                        <View style={styles.cardContent}>
                                             {(item.profile_image) ?
                                                  <Image style={[styles.image, styles.imageContent]} source={{ uri: item.profile_image }} /> :
                                                  <View style={[styles.imageIcon, styles.imageContent]}>
                                                       <Text style={styles.imageIconText}>{item.name.charAt(0)}</Text>
                                                  </View>
                                             }

                                             <Text style={styles.name}>{item.name}</Text>
                                        </View>
                                        <View style={[styles.cardContent, styles.tagsContent]}>
                                             <Text>{item?.company?.name}</Text>
                                        </View>
                                   </TouchableOpacity>
                              )}
                              keyExtractor={(item) => String(item.customerId)}
                         />
                    </View>

               }

          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          // justifyContent: 'center',
          padding: 10
     },
     containerItem: {
          marginTop: 20
     },
     input: {
          height: 40,
          borderWidth: 1,
          padding: 10
     },

     icon: {
          width: 30,
          height: 30,
     },
     iconBtnSearch: {
          alignSelf: 'center'
     },
     inputs: {
          height: 45,
          marginLeft: 16,
          borderBottomColor: '#FFFFFF',
          flex: 1,
     },
     inputIcon: {
          marginLeft: 15,
          justifyContent: 'center'
     },
     notificationList: {
          marginTop: 20,
          padding: 10,
     },
     card: {
          height: null,
          paddingTop: 10,
          paddingBottom: 10,
          marginTop: 5,
          backgroundColor: '#FFFFFF',
          flexDirection: 'column',
          borderTopWidth: 40,
          marginBottom: 20,
     },
     cardContent: {
          flexDirection: 'row',
          marginLeft: 10,
     },
     imageContent: {
          marginTop: -40,
     },
     tagsContent: {
          marginTop: 10,
          flexWrap: 'wrap'
     },
     image: {
          width: 60,
          height: 60,
          borderRadius: 30,
     },
     imageIcon: {
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#696969',
          justifyContent: 'center',
          alignItems:'center'
     },
     imageIconText: {
          fontSize: 25,
          fontWeight: 'bold',
          color: '#fff'
     },
     name: {
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 10,
          alignSelf: 'center'
     },
     btnColor: {
          padding: 10,
          borderRadius: 40,
          marginHorizontal: 3,
          backgroundColor: "#eee",
          marginTop: 5,
     },
});

export default Home;
