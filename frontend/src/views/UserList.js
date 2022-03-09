import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Alert } from 'react-native'
import axios from "axios";
import { Button, Icon, ListItem, Avatar } from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default props => {
    //const [users, setUsers] = useState([])

    const { state } = useContext(UsersContext)
    console.log(state)

/*     useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('http://192.168.15.17:8080/users');
                setUsers(response);

            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []); */

    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    console.warn('delete ' + user.id)
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem
                key={user.id}
                bottomDivider
                onPress={() => props.navigation.navigate('UserForm', user)}
            >
                <Avatar size={40} source={{ uri: user.profilePhoto }} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                </ListItem.Content>
                <Button
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="orange" />}
                />
                <Button
                    onPress={() => confirmUserDeletion(user)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red" />}
                />
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state}
                renderItem={getUserItem}
            />
        </View>
    )
}


