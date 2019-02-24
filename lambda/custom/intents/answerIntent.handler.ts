import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response, IntentRequest } from "ask-sdk-model";
import { Game } from "../models/game";

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

        var answer: number = +request.intent.slots!.answer.value;

        var playerCount: number = SessionAttributes.game.players.length;
        var roundCount: number = SessionAttributes.game.numberOfRound;

        const game: Game = new Game(playerCount, roundCount);
        game.copy(SessionAttributes.game as Game);
        SessionAttributes.game = game;
        
        const speechText = game.guessToSpeechText(answer, requestAttributes);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(speechText, speechText)
            .getResponse();
    }

};