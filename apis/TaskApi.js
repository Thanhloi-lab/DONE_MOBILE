export async function allTaskOfUser(id) {
    let response = await fetch(`https://192.168.1.4:50003/api/Tasks/allTaskOf?Id=${id}`);
    let data = await response.json();
    return data;
};