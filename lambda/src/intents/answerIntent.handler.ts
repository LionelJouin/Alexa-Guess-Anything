import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response, IntentRequest } from "ask-sdk-model";
import { Game } from "../models/game";
import { State } from "../models/state.enum";
import { ErrorTypes } from "../errors/ErrorTypes";
import { SpeechLocal } from "../utils/speechLocal";

export class AnswerIntentHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'AnswerIntent';
    }

    public handle(handlerInput: HandlerInput): Response {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const request = handlerInput.requestEnvelope.request as IntentRequest;
        const speechLocal = SpeechLocal.getInstance(requestAttributes);

        if (sessionAttributes.state === State.MENU) {
            let error = new Error('State in menu');
            error.name = ErrorTypes.WRONG_STATE;
            throw error;
        }

        var answer: number = +request.intent.slots!.answer.value!;

        var playerCount: number = sessionAttributes.game.players.length;
        var roundCount: number = sessionAttributes.game.numberOfRound;

        const game: Game = new Game(playerCount, roundCount);
        game.copy(sessionAttributes.game as Game);
        sessionAttributes.game = game;

        const speechText = game.guessSpeechOutput(answer);

        if (game.isFinished())
            sessionAttributes.state = State.MENU;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(speechText, speechText)
            .getResponse();
    }

};