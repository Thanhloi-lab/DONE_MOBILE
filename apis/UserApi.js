import {
    Alert,
} from 'react-native'


export const API_URL = "https://2440-113-172-24-168.ap.ngrok.io"



export const register = async (data) => {
    const formData = new FormData();
    formData.append("Mail", data.email)
    formData.append("Password", data.password)
    formData.append("Name", data.name)
    formData.append("Phone", data.phone)
    formData.append("Avatar", data.avatar)
    formData.append("Address", "dsadasdsad")
    formData.append("Gender", "Nam")
    formData.append("BirthDate", "2021-01-01")


    return fetch(`${API_URL}/api/Users/register`, {
        method: 'POST', 
        body: formData // body data type must match "Content-Type" header
    })
};

export const verifyEmail = async (data) => {
    const formData = new FormData();
    formData.append("Mail", data.email)
    formData.append("ActivationToken", data.token)

    return fetch(`${API_URL}/api/Users/ConfirmMail`, {
        method: 'PUT', 
        body: formData // body data type must match "Content-Type" header
    })
};

export const login = async (data) => {
    const formData = new FormData();
    formData.append("Mail", data.email)
    formData.append("Password", data.password)

    return fetch(`${API_URL}/api/Users/Login`, {
        method: 'POST', 
        body: formData 
    })
};

export const getUserInfoById = async (id) => {
    return fetch(`${API_URL}/api/Users/getById?id=${id}`)
};

export const forgotPassword = async (email) => {
   
    return fetch(`${API_URL}/api/Users/forgetPassword?mail=${email}`, {
        method: 'POST', 
    })
};

export const sendVerifyCode = async (email) => {
    return fetch(`${API_URL}/api/Users/ReSendMailConfirm?mail=${email}`, {
        method: 'POST', 
    })
};

export const editInfo = (data) =>{
    const formData = new FormData();
    formData.append("Id", data.id)
    formData.append("Name", data.name)
    formData.append("Phone", data.phone)
    formData.append("Address", "dsadasdsad")
    formData.append("Gender", "Nam")
    formData.append("BirthDate", "2021-01-01")
    return fetch(`${API_URL}/api/Users/UpdateInfo`, {
        method: 'PUT', 
        body:formData 

    })
}

export const editAvatar = (data) =>{
    const formData = new FormData();
    formData.append("IdUser", data.id)
    formData.append("Avatar", data.avatar)


    return fetch(`${API_URL}/api/Users/updateAvatar`, {
        method: 'PUT', 
        body:formData 

    })
}

export const changePassword = async (data) => {
    const formData = new FormData();
    formData.append("Id", data.id)
    formData.append("Password", data.password)
    formData.append("NewPassword", data.newPassword)

    return fetch(`${API_URL}/api/Users/changePassword`, {
        method: 'PUT',
        body:formData 
    })
};


export const getTask = async (id) => {
    return fetch(`${API_URL}/api/Tasks/allTaskOf?Id=${id}`)
};

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

export async function getUserByText(text) {
    let response = await fetch(`http://192.168.0.103:50003/api/Users/findUser?keyword=${text}`);
    let data = await response.json();
    return data;
};

export async function getUserByGroupId(id) {
    let response = await fetch(`http://192.168.0.103:50003/api/Groups/allMembers?Id=${id}`);
    let data = await response.json();
    return data;
};

