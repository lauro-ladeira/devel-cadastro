import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

const UsersContext = createContext({})


export const UsersProvider = props => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('http://192.168.15.17:8080/users');
                setUsers(response);
    
            } catch (error) {
                console.error(error.message);
            }
        }
    
        fetchData();
    }, []);

    return (
        <UsersContext.Provider value={{
            state: users
        }}>
            {props.children}
        </UsersContext.Provider>
    )
}

export default UsersContext