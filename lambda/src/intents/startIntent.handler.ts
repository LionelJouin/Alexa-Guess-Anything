import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response, IntentRequest } from "ask-sdk-model";
import { Game } from "../models/game";
import { State } from "../models/state.enum";
import { ErrorTypes } from "../errors/ErrorTypes";
import { SpeechLocal } from "../utils/speechLocal";

export class StartIntentHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'StartIntent';
    }

    public handle(handlerInput: HandlerInput): Response {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const request = handlerInput.requestEnvelope.request as IntentRequest;
        const speechLocal = SpeechLocal.getInstance(requestAttributes);

        if (sessionAttributes.state === State.INGAME) {
            let error = new Error('State in game');
            error.name = ErrorTypes.WRONG_STATE;
            throw error;
        }

        var playerCount: number = 1;
        if (request.intent.slots!.playerCount.value)
            playerCount = +request.intent.slots!.playerCount.value;

        sessionAttributes.game = new Game(playerCount);
        const game: Game = sessionAttributes.game as Game;

        sessionAttributes.state = State.INGAME;

        const speechText = game.questionSpeechOutput();

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(speechText, speechText)
            .getResponse();
    }

};