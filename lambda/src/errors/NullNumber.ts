import { ErrorHandler, HandlerInput } from "ask-sdk-core";
import { Response, IntentRequest } from "ask-sdk-model";
import { ErrorTypes } from "./ErrorTypes";
import { Game } from "../models/game";
import { SpeechLocal } from "../utils/SpeechLocal";
import { stringFormat } from "../utils/stringFormat";

export class NullNumber implements ErrorHandler {

    public canHandle(_: HandlerInput, error: Error): boolean {
        return error.name === ErrorTypes.NULL_NUMBER;
    }

    public handle(handlerInput: HandlerInput, error: Error): Response {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const request = handlerInput.requestEnvelope.request as IntentRequest;
        const speechLocal = SpeechLocal.getInstance(requestAttributes);
        
        var playerCount: number = SessionAttributes.game.players.length;
        var roundCount: number = SessionAttributes.game.numberOfRound;

        const game: Game = new Game(playerCount, roundCount);
        game.copy(SessionAttributes.game as Game);
        SessionAttributes.game = game;

        let speechOutput = stringFormat("{0} {1}", speechLocal.getSpeechOutput("I_DID_NOT_UNDERSTAND"), game.questionSpeechOutput());

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .withSimpleCard(speechOutput, speechOutput)
            .getResponse();
    }

};