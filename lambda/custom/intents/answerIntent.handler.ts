import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response, IntentRequest } from "ask-sdk-model";
import { Game } from "../models/game";
import { State } from "../models/state.enum";
import { ErrorTypes } from "../errors/ErrorTypes";

export class AnswerIntentHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'AnswerIntent';
    }

    public handle(handlerInput: HandlerInput): Response {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const request = handlerInput.requestEnvelope.request as IntentRequest;

        if (SessionAttributes.state === State.MENU) {
            let error = new Error('State in menu');
            error.name = ErrorTypes.WRONG_STATE;
            throw error;
        }

        var answer: number = +request.intent.slots!.answer.value;

        var playerCount: number = SessionAttributes.game.players.length;
        var roundCount: number = SessionAttributes.game.numberOfRound;

        const game: Game = new Game(playerCount, roundCount);
        game.copy(SessionAttributes.game as Game);
        SessionAttributes.game = game;

        const speechText = game.guessToSpeechText(answer, requestAttributes);

        if (game.isFinished())
            SessionAttributes.state = State.MENU;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(speechText, speechText)
            .getResponse();
    }

};