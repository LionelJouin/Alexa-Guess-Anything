import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response, IntentRequest } from "ask-sdk-model";
import { Game } from "../models/game";

export class StartIntentHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'StartIntent';
    }

    public handle(handlerInput: HandlerInput): Response {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const request = handlerInput.requestEnvelope.request as IntentRequest;

        var playerCount: number = 1;
        if (request.intent.slots!.playerCount.value)
            playerCount = +request.intent.slots!.playerCount.value;

        SessionAttributes.game = new Game(playerCount);
        const game: Game = SessionAttributes.game as Game;

        const speechText = game.questionToSpeechText(requestAttributes);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(speechText, speechText)
            .getResponse();
    }

};