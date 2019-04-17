var TelegramBot = require('node-telegram-bot-api');
const token = require('./tgapi_token');

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

let curriculumObject = {
    "16-4-2019": "\n15:10 ===> \nПара 5:  Бази даних (211)-Краснощок В.М. (Л); \n16:40 ===> \nПара 6:  Менеджмент проектів програмного забезпечення (318)-Хлевний Андрій Олександрович (Л)", "17-4-2019": "\n13-40 ===> \nПара 4:  Інженерія програмного забезпечення (209)-Бойко Ю.П. (Л); \n15-10 ===> \nПара 5:  Об'єктно-орієнтоване програмування (209)-Духновська К.К. (Л); \n16-40 ===> \nПара 6:  Менеджмент проектів програмного забезпечення (201)-Шелест Тетяна Миколаївна (л) підгрупа 2",
    "18-4-2019": "\n13-40 ===> \nПара 4:  Об'єктно-орієнтоване програмування (311)-Духновська К.К. (л) підгрупа 1; \n15-10 ===> \nПара 5:  Об'єктно-орієнтоване програмування (201)-Духновська К.К. (л) підгрупа 2; \n15-10 ===> \nПара 5:  Менеджмент проектів програмного забезпечення (202)-Хлевний Андрій Олександрович (л) підгрупа 1; \n16-40 ===> \nПара 6:  Інформаційні системи і технології на підприємствах (209)-Плескач В.Л. (Л)",
    "19-4-2019": "\n13-40 ===> \nПара 4:  Об'єктно-орієнтоване програмування (202)-Духновська К.К. (л) підгрупа 1; \nПара 4:  Бази даних (215)-Краснощок В.М. (л) підгрупа 2; \n15-10 ===> \nПара 5:  Інформаційні системи і технології на підприємствах (202)-Краснощок В.М. (л) підгрупа 1; \n15-10 ===> \nПара 5:  Безпека мереж і комп'ютерних систем (217)-Тітова А.Ю. (л) підгрупа 2; \n16-40 ===> \nПара 6:  Об'єктно-орієнтоване програмування (306)-Духновська К.К. (л) підгрупа 2; \n16-40 ===> \nПара 6:  Безпека мереж і комп'ютерних систем (318)-Тітова А.Ю. (л) підгрупа 1",
    "23-4-2019": "\n13-40 ===> \nПара 4:  Прикладне програмне забезпечення (217)-Домрачев В.М. (П); \n15-10 ===> \nПара 5:  Бази даних (307)-Краснощок В.М. (л) підгрупа 1; \n15-10 ===> \nПара 5:  Менеджмент проектів програмного забезпечення (202)-Шелест Тетяна Миколаївна (л) підгрупа 2; \n16-40 ===> \nПара 6:  Менеджмент проектів програмного забезпечення (318)-Хлевний Андрій Олександрович (Л)",
    "24-4-2019": "\n13-40 ===> \nПара 4:  Об'єктно-орієнтоване програмування (211)-Духновська К.К. (Л); \n15-10 ===> \nПара 5:  Прикладне програмне забезпечення (209)-Домрачев В.М. (Л); \n16-40 ===> \nПара 6:  Менеджмент проектів програмного забезпечення (208)-Хлевний Андрій Олександрович (л) підгрупа 1",
};

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
