import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { State } from "../../models/state.enum";
import { ErrorTypes } from "../../errors/ErrorTypes";
import { SpeechLocal } from "../../utils/SpeechLocal";
import { stringFormat } from "../../utils/stringFormat";

export class LaunchRequestHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    }

    public handle(handlerInput: HandlerInput): Response {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const speechLocal = SpeechLocal.getInstance(requestAttributes);
        const speechOutput = stringFormat("{0} {1}", speechLocal.getSpeechOutput("WELCOME_MESSAGE"), speechLocal.getSpeechOutput("WHAT_DO_YOU_WANT"));

        if (sessionAttributes.state === State.INGAME) {
            let error = new Error('State in game');
            error.name = ErrorTypes.WRONG_STATE;
            throw error;
        }

        sessionAttributes.state = State.MENU;

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .withSimpleCard(speechOutput, speechOutput)
            .getResponse();
    }

};