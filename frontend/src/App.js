import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from 'react-native-elements';
import UserList from "./views/UserList";
import UserForm from "./views/UserForm";
import { UsersProvider } from "./context/UsersContext";

const Stack = createNativeStackNavigator()

export default props => {
    return (
        <UsersProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="UserList"
                    screenOptions={screenOptions}>
                    <Stack.Screen
                        name="UserList"
                        component={UserList}
                        options={({navigation}) => {
                            return {
                                title: "Registered users",
                                headerRight: () => {
                                    return (
                                        <Button
                                            type="clear"
                                            icon={<Icon name="add" size={30} color='#fff' />}
                                            onPress={() => navigation.navigate('UserForm')}
                                        />
                                    )
                                }
                            }
                        }}
                    />
                    <Stack.Screen
                        name="UserForm"
                        component={UserForm}
                        options={{
                            title: "Formulário de Usuários"
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </UsersProvider>
    )
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#1b75bb'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: "ibarra-regular"
    }
}