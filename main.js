var builder = require('botbuilder');
var restify = require('restify');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', connector.listen());
server.get(/.*/, restify.serveStatic({
    'directory': '.',
    'default': 'index.html'
}));
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: null,
    appPassword: null
});

var bot = new builder.UniversalBot(connector);

//=========================================================
// Bots Dialogs
//=========================================================

// bot.dialog('/', function (session) {
//     session.send("Hello World");
// });


var intents = new builder.IntentDialog();
bot.dialog('/', [
    function (session) {
        session.send("Good. First of all choose the image that seems like your burn.");
        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout('carousel')   // Horizontal to swipe!
            .attachments([
                new builder.HeroCard(session)
                    .title("First degree burn")
                    .images([builder.CardImage.create(session, "http://i67.tinypic.com/j63ps0.jpg")])
                    .tap(builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Space_Needle")),
            
                new builder.HeroCard(session)
                    .title("Second degree burn")
                    .images([builder.CardImage.create(session, "http://i68.tinypic.com/34rjcqs.jpg")])
                    .tap(builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Space_Needle")),

            new builder.HeroCard(session)
                    .title("Second degree burn")
                    .images([builder.CardImage.create(session, "http://i65.tinypic.com/1zfk1v5.jpg")])
                    .tap(builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Space_Needle")),

            new builder.HeroCard(session)
                    .title("Thirst degree burn")
                    .images([builder.CardImage.create(session, "http://i63.tinypic.com/14jumwh.jpg")])
                    .tap(builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Space_Needle"))
        
        ]);
        session.send(msg);
        session.beginDialog('/otro');
    }
]);

bot.dialog('/otro', [
    function (session) {
        session.send("Hi");
        session.endDialog(msg);
    }
]);