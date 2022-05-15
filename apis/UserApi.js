import {
    Alert,
} from 'react-native'


export const getUserInfo = async (id) => {

    // fetch()
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         console.log(responseJson)

    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });

    fetch('http://192.168.0.103:50003/api/Users/getUser?Id=' + id)
    .then((response) => response.json())
    .then((json) => {
        return json;
    }).catch((error) => {
        console.error(error);
    });
};