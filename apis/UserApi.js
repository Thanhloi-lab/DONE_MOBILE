import { constants } from "../constants";

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


    return fetch(`${constants.API_URL}/api/Users/register`, {
        method: 'POST',
        body: formData // body data type must match "Content-Type" header
    })
};

export const verifyEmail = async (data) => {
    const formData = new FormData();
    formData.append("Mail", data.email)
    formData.append("ActivationToken", data.token)

    return fetch(`${constants.API_URL}/api/Users/ConfirmMail`, {
        method: 'PUT',
        body: formData // body data type must match "Content-Type" header
    })
};

export const login = async (data) => {
    const formData = new FormData();
    formData.append("Mail", data.email)
    formData.append("Password", data.password)

    return fetch(`${constants.API_URL}/api/Users/Login`, {
        method: 'POST',
        body: formData
    })
};

export const getUserInfoById = async (id) => {
    return fetch(`${constants.API_URL}/api/Users/getById?id=${id}`)
};

export const forgotPassword = async (email) => {

    return fetch(`${constants.API_URL}/api/Users/forgetPassword?mail=${email}`, {
        method: 'POST',
    })
};

export const sendVerifyCode = async (email) => {
    return fetch(`${constants.API_URL}/api/Users/ReSendMailConfirm?mail=${email}`, {
        method: 'POST',
    })
};

export const editInfo = (data, token) =>{
    const formData = new FormData();
    formData.append("Id", data.id)
    formData.append("Name", data.name)
    formData.append("Phone", data.phone)
    formData.append("Address", "dsadasdsad")
    formData.append("Gender", "Nam")
    formData.append("BirthDate", "2021-01-01")
    return fetch(`${constants.API_URL}/api/Users/UpdateInfo`, {
        method: 'PUT', 
        body:formData,
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', 
    })
}

export const editAvatar = (data, token) =>{
    const formData = new FormData();
    formData.append("IdUser", data.id)
    formData.append("Avatar", data.avatar)


    return fetch(`${constants.API_URL}/api/Users/updateAvatar`, {
        method: 'PUT', 
        body:formData,
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', 
    })
}

export const changePassword = async (data, token) => {
    const formData = new FormData();
    formData.append("Id", data.id)
    formData.append("Password", data.password)
    formData.append("NewPassword", data.newPassword)

    return fetch(`${constants.API_URL}/api/Users/changePassword`, {
        method: 'PUT',
        body: formData,
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', 
    })
};


export const getTask = async (id, token) => {
    return fetch(`${constants.API_URL}/api/Tasks/allTaskOf?Id=${id}`,{
        method: 'GET',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
    });
};

export const getUserInfo = async (id) => {
    fetch(`${constants.API_URL}/api/Users/getUser?Id=${id}`)
        .then((response) => response.json())
        .then((json) => {
            return json;
        }).catch((error) => {
            console.error(error);
        });
};

export async function getUserByText(text, token) {
    let response = await fetch(`${constants.API_URL}/api/Users/findUser?keyword=${text}`,{
        method: 'GET',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', 
    });
    let data = await response.json();
    return data;
};

export async function getUserByGroupId(id, token) {
    let response = await fetch(`${constants.API_URL}/api/Groups/allMembers?Id=${id}`,{
        method: 'GET',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', 
    });
    let data = await response.json();
    return data;
};

export async function getUserByProjectId(id, token) {
    let response = await fetch(`${constants.API_URL}/api/Projects/allMembers?Id=${id}`,{
        method: 'GET',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', 
    });
    let data = await response.json();
    return data;
};

export async function getUserByTaskId(id, token) {
    let response = await fetch(`${constants.API_URL}/api/Tasks/allMembers?Id=${id}`,{
        method: 'GET',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', 
    });
    let data = await response.json();
    return data;
};
