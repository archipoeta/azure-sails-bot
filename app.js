/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var fs = require("fs");
var https = require("https");
var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");

var commands = {};
var libs = {
	'fs': fs,
	'https': https,
	'builder': builder
};

commands['echo'] = require('./lib/commands/echo');
commands['haiku'] = require('./lib/commands/haiku');
commands['youtube'] = require('./lib/commands/youtube');

var haiku = JSON.parse(fs.readFileSync('./lib/commands/haiku.json'));

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

bot.dialog('/', [
    function (session) {
		var msg = session.message.text.replace(/^[@]*Aster/, '').trimLeft();
		var cmd_syntax = new RegExp('([\s]*[a-z0-9\_\-]+)');
		var cmd = msg.match(cmd_syntax);
		cmd = cmd[1];

		var args = [];
		if ( msg.match( /\n/ ) ) {
			var lines = msg.split(/\n/);
			args = lines[0].split(/\s+/);
		} else {
			args = msg.split(/\s+/);
		}
		args = args.slice(1);

		// Setup various userData
		session.userData.haiku = haiku;
		session.userData.command = cmd;
		session.userData.parameters = args;
		session.userData.message = msg;

		if ( commands[cmd] ) {
			var output = commands[cmd](session, libs);
			if (output) {
				if (typeof output === 'function' || typeof output === 'object') {
					var _s = new builder.Message(session).addAttachment(output);
					session.send(_s).endDialog();
				} else {
					session.userData.response = output;
					session.send(session.userData.response);
				}
			}
		} else {
			session.userData.response = msg;
			session.send(session.userData.response);
		}

        //builder.Prompts.text(session, "Hello... What's your name?");
    }

/*
    function (session, results) {
        session.userData.name = results.response;
        builder.Prompts.number(session, "Hi " + results.response + ", How many years have you been coding?"); 
    },
    function (session, results) {
        session.userData.coding = results.response;
        builder.Prompts.choice(session, "What language do you code Node using?", ["JavaScript", "CoffeeScript", "TypeScript"]);
    },
    function (session, results) {
        session.userData.language = results.response.entity;
        session.send("Got it... " + session.userData.name + 
                    " you've been programming for " + session.userData.coding + 
                    " years and use " + session.userData.language + ".");
    }
*/

]);
