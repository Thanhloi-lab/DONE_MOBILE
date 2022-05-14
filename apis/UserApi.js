import {
    Alert,
} from 'react-native'


export const getUserInfo = async (id) => {

    fetch('http://192.168.1.4:50003/api/Users/getUser?Id=' + id)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)

        })
        .catch((error) => {
            console.error(error);
        });
};