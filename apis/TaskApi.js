export async function allTaskOfUser(id) {
    // let response = await fetch(`https://192.168.1.4:50003/api/Tasks/allTaskOf?Id=${id}`);
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

    let response = await fetch(`http://192.168.1.4:50003/api/Tasks/allTaskOf?Id=${id}`);
    let data = await response.json();
    return data;
};