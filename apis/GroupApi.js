import { constants } from "../constants";

export async function allUserGroup(id, token) {

    let response = await fetch(`${constants.API_URL}/api/Groups/allGroupOf?Id=${id}`,{
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

export async function getGroupById(id, token) {
    let response = await fetch(`${constants.API_URL}/api/Groups/getById?Id=${id}`,{
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


export async function createGroup(data, token) {
    // Default options are marked with *
    //console.log(data);
    const response = await fetch(`${constants.API_URL}/api/Groups/create`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            //Thêm token ở đây nha gái
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function editGroup(data, token) {
    // Default options are marked with *
    // console.log(data);
    const response = await fetch(`${constants.API_URL}/api/Groups/Edit`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            //Thêm token ở đây nha gái
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    //console.log(response.json());
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function deleteGroup(data, token) {
    // Default options are marked with *
    const response = await fetch(`${constants.API_URL}/api/Groups/removeGroup`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            //Thêm token ở đây nha gái
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    //console.log(response.json());
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function addGroupMembers(data, token) {
    // Default options are marked with *
    //console.log(data);
    const response = await fetch(`${constants.API_URL}/api/Groups/addMember`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            //Thêm token ở đây nha gái
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function removeGroupMembers(data, token) {
    // Default options are marked with *
    //console.log(data);
    const response = await fetch(`${constants.API_URL}/api/Groups/removeMember`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            //Thêm token ở đây nha gái
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}