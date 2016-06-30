/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This sample shows how to create a Lambda function for handling Alexa Skill requests that:
 *
 * - Custom slot type: demonstrates using custom slot types to handle a finite set of known values
 *
 * Examples:
 *   One-shot model:
 *    User: "Alexa, ask fridge storage times how long can I keep bacon."
 *    Alexa: "(reads back storage times for bacon)"

 */


'use strict';

var AlexaSkill = require('./AlexaSkill'),
    recipes = require('./recipes');

var APP_ID = "amzn1.echo-sdk-ams.app.20c87d4c-f522-4d0d-81e2-39aef0c3a7ad"; //replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

/**
 * FridgeStorageTimesHelper is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var FridgeStorageTimesHelper = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
FridgeStorageTimesHelper.prototype = Object.create(AlexaSkill.prototype);
FridgeStorageTimesHelper.prototype.constructor = FridgeStorageTimesHelper;

FridgeStorageTimesHelper.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to the Fridge Storage Times Helper. It will provide information on recommended safe refrigeration times for common foods. You can ask a question like, how long can I keep a steak... Now, what can I help you with.. Disclaimer:  Refrigeration guidelines were collected from FoodSafety.gov. In no event will I be liable for any food-born illness, death, or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever in connection with, the use of this Amazon Alexa Skill.";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

FridgeStorageTimesHelper.prototype.intentHandlers = {
    "RecipeIntent": function (intent, session, response) {
        var itemSlot = intent.slots.Item,
            itemName;
        if (itemSlot && itemSlot.value){
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = "Safe storage times for " + itemName + ",",
            recipe = recipes[itemName],
            speechOutput,
            repromptOutput;
        if (recipe) {
            speechOutput = {
                speech: recipe,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, recipe);
        } else {
            var speech;
            if (itemName) {
                speech = "I'm sorry, I currently do not know the storage times for " + itemName + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know that particular item. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask about storage times for refrigerated and frozen items such as, how long can I keep a bacon refrigerated, or, you can say exit... Now, what can I help you with?";
        var repromptText = "You can say things like, how long can I freeze an {Item}, or you can say exit... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var fridgestoragetimesHelper = new FridgeStorageTimesHelper();
    fridgestoragetimesHelper.execute(event, context);
};
