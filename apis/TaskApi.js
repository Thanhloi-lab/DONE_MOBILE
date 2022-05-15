export async function allTaskOfUser(id) {
    // let response = await fetch(`https://192.168.0.103:50003/api/Tasks/allTaskOf?Id=${id}`);
    // let data = await response.json();
    // return data;
    // console.log(`http://192.168.0.103:50003/api/Tasks/allTaskOf?Id=${id}`);
    // fetch(`http://192.168.0.103:50003/api/Tasks/allTaskOf?Id=${id}`)
    //     .then((response) => response.json())
    //     .then((json) => {
    //         // console.log(json)
    //         return json;
    //     }).catch((error) => {
    //         console.error(error);
    //     });

    let response = await fetch(`http://192.168.0.103:50003/api/Tasks/allTaskOf?Id=${id}`);
    let data = await response.json();
    return data;
};

export async function createTask(data) {
    // Default options are marked with *
    //console.log(data);
    const response = await fetch(`http://192.168.1.4:50003/api/Tasks/create`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            //Thêm token ở đây nha gái
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function editTask(data) {
    // Default options are marked with *
    // console.log(data);
    const response = await fetch(`http://192.168.1.4:50003/api/Tasks/Edit`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
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
