var TelegramBot = require('node-telegram-bot-api');
const token = require('./tgapi_token');
const curriculumObject = require('./curriculum');

process.env.TZ = 'Europe/Kiev';

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
        if (curriculumObject[getCurrentFormatedDate()] != undefined) {
            sendMessageByBot(messageChatId, '👨‍🎓The curriculum for today👩‍🎓 :' + "\n" + curriculumObject[getCurrentFormatedDate()]);
        } else  {
            sendMessageByBot(messageChatId, 'There is no curriculum for today! ✅');
        }
    } else if (messageText == '/tomorrow') {
        let now = new Date(), tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);
        if (curriculumObject[getFormatedDate(tomorrow)] != undefined) {
            sendMessageByBot(messageChatId, '👨‍🎓The curriculum for tomorrow👩‍🎓 :' + "\n" + curriculumObject[getFormatedDate(tomorrow)]);
        } else  {
            sendMessageByBot(messageChatId, 'There is no curriculum for tomorrow! ✅');
        }
    }

    console.log(msg);
});
