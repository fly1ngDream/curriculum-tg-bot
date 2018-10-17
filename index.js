var TelegramBot = require('node-telegram-bot-api');

var token = '***REMOVED***';
var botOptions = {
    polling: true
};
var bot = new TelegramBot(token, botOptions);

bot.getMe().then(function(me)
{
    console.log('Hello! My name is %s!', me.first_name);
    console.log('My id is %s.', me.id);
    console.log('And my username is @%s.', me.username);
});

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
        if (getCurrentFormatedDate() == week[i]) {
            return true;
        }
    }
    return false;
}

function sendMessageByBot(aChatId, aMessage)
{
    bot.sendMessage(aChatId, aMessage, { caption: 'I\'m a cute bot!' });
}

function sendPhotoByBot(aChatId, aPhoto) {
    bot.sendPhoto(aChatId, aPhoto);
}

bot.on('text', function(msg)
{
    var messageChatId = msg.chat.id;
    var messageText = msg.text;
    var messageDate = msg.date;
    var messageUsr = msg.from.username;

    if (messageText === '/curriculum') {
        sendMessageByBot(messageChatId, 'The curriculum for the current week :');
        if (weekCheck("15-10-2018")) {
            sendPhotoByBot(messageChatId, '/home/yevhens/Deploy/15-10-2018.png');
        } else if (weekCheck("22-10-2018")) {
            sendPhotoByBot(messageChatId, '/home/yevhens/Deploy/22-10-2018.png')
        }
    }

    console.log(msg);
});
