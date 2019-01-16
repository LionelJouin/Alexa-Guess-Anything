import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { Game } from "../models/game";

export class StartIntentHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'TestIntent';
    }

    public handle(handlerInput: HandlerInput): Response {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        attributes.game = new Game();
        const game: Game = attributes.game as Game;
        const speechText = game.questionToSpeechText(requestAttributes);
        // const speechText = "Quel est la taille de " + game.getCurrentQuestion().itemToGuess + " ?";
        // const speechText = requestAttributes.t("TEST");
        // attributes.counter = 0;
        // attributes.expectedAnswer = 100;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(speechText, speechText)
            .getResponse();
    }

};