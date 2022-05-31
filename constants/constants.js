const screens = {
    main_layout: "MainLayout",
    home: "Home",
    search: "Search",
    group: "Group",
    project: "Project",
    notification: "Notification",
    statistics: "Statistics",
}

const bottom_tabs = [
    {
        id: 0,
        label: screens.home,
    },
    {
        id: 1,
        label: screens.group,
    }, 
    {
        id: 2,
        label: screens.project,
    }, 
    {
        id: 3,
        label: screens.statistics,
    }, 
    {
        id: 4,
        label: screens.notification,
    }
];

const API_URL = "http://192.168.0.103:50003";

const constants = {
    screens,
    bottom_tabs,
    API_URL
}

export default constants