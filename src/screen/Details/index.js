import React, { useState } from 'react';
import {
     ActivityIndicator,
     FlatList,
     StyleSheet,
     Text,
     View,
     TouchableOpacity,
     Image
} from 'react-native';



const Details = ({ route, navigation }) => {

     const [loader, setLoader] = useState(true);
     const [empDetails, setEmpDetails] = useState(null);
     React.useEffect(() => {
          console.log(route.params)
          setEmpDetails(route.params.empDetail)
          setLoader(false)
     }, []);
     return (
          <View style={styles.container}>
               {loader ?
                    <ActivityIndicator size="large" color="#27AA3D" />
                    :
                    <View style={styles.container}>
                         <View style={styles.header}></View>
                         <Image style={styles.avatar} source={{ uri: empDetails.profile_image }} />
                         <View style={styles.body}>
                              <Text style={styles.name}>{empDetails.name}</Text>
                              <Text style={styles.info}>Username : {empDetails.username}</Text>
                              <Text style={styles.info}>Email : {empDetails.email}</Text>
                              <Text style={styles.info}>Phone  : {empDetails.phone}</Text>
                              <Text style={styles.description}>Address : {empDetails?.address?.street} ,{empDetails?.address?.suite}, {empDetails?.address?.city} , {empDetails?.address?.zipcode}</Text>

                              <View style={styles.line} />

                              <Text style={styles.info}>Company : {empDetails?.company?.name}</Text>
                              <Text style={styles.description}>{empDetails?.company?.catchPhrase}</Text>

                         </View>
                    </View>}
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          padding: 10,
          backgroundColor: '#fff'
     },
     header: {
          backgroundColor: "#00BFFF",
          height: 200,
     },
     line: {
          width: '100%',
          height: .5,
          backgroundColor: '#696969',
          marginTop: 30
     },
     avatar: {
          width: 130,
          height: 130,
          borderRadius: 63,
          borderWidth: 4,
          borderColor: "white",
          marginBottom: 10,
          alignSelf: 'center',
          position: 'absolute',
          marginTop: 130
     },
     name: {
          fontSize: 22,
          color: "#FFFFFF",
          fontWeight: '600',
     },
     body: {
          marginTop: 80,
          // alignItems: 'center'
          padding :10
     },

     name: {
          fontSize: 28,
          color: "black",
          fontWeight: "600"
     },
     info: {
          fontSize: 16,
          color: "black",
          marginTop: 10
     },
     description: {
          fontSize: 16,
          color: "black",
          marginTop: 10,
          // textAlign: 'center'
     },
});


export default Details;
