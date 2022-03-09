import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';
import axios from "axios";

/* const postData = async (user) => {
    const newUser = {
        name: user.name,
        profilePhoto: "pppppppppp",
        birthDate: "11/01/1991"
    }

    const response = await axios.post(`http://192.168.15.17:8080/users/create`, newUser)
    console.log(response)
}
 */
export default ({ route, navigation }) => {
    const [user, setUser] = useState(route.params ? route.params : {})
    console.log(user)

    const handleSubmit = () => {
        const data = {
          name: user.name,
          profilePhoto: user.profilePhoto,
          birthDate: user.birthDate
        }

        if(user.id == null) {
            axios.post('http://192.168.15.17:8080/users/create', data).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            });
        } else {
            const link = 'http://192.168.15.17:8080/users/' + user.id

            console.log(link)
            console.log(data)

            axios.put(link, data).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            });
        }

/*         setUser(data)
        navigation.navigate('UserList', user) */

      }

    return (
        <View style={style.form}>
            <Text>Name</Text>
            <TextInput
                style={style.input}
                onChangeText={name => setUser({ ...user, name })}
                placeholder="Enter the name"
                value={user.name}
            />
            <Text>Birthday</Text>
            <TextInput
                style={style.input}
                onChangeText={birthDate => setUser({ ...user, birthDate })}
                placeholder="Enter the date of birth"
                value={user.birthDate}
            />
            <Text>Profile photo url</Text>
            <TextInput
                style={style.input}
                onChangeText={profilePhoto => setUser({ ...user, profilePhoto })}
                placeholder="Enter the profile photo url"
                value={user.profilePhoto}
            />
            <Button
                title="Save"
                type="submit"
                onPress={handleSubmit}
            />
        </View>


    )
}






const style = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    }
})