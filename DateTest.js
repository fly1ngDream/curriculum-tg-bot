function getCurrentFormatedDate() {
    let now = new Date();
    let nowStr = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
    return nowStr;
}

function getFormatedDate(date) {
    let now = date;
    let nowStr = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
    return nowStr;
}

function weekCheck(monday) {
    let mondayId = monday.split('-')[0];
    let week = [];
    for (var i = mondayId; i <= mondayId + 6; i++) {
        week[i] = i + "-" + monday.split('-')[1] + "-" + monday.split('-')[2];
    }
    for (var i = 0; i < week.length; i++) {
        if (getCurrentDate() == week[i]) {
            return true;
        }
    }
    return false;
}

console.log(weekCheck("22-10-2018"));

let now = new Date('2018-11-17');
console.log(getFormatedDate(now));
