import { ErrorHandler, HandlerInput } from "ask-sdk-core";
import { Response, IntentRequest } from "ask-sdk-model";
import { ErrorTypes } from "./ErrorTypes";
import { SpeechLocal } from "../utils/speechLocal";

export class Unknown implements ErrorHandler {

    public canHandle(_: HandlerInput, error: Error): boolean {
        return error.name !== ErrorTypes.WRONG_STATE && error.name !== ErrorTypes.NULL_NUMBER;
    }

    public handle(handlerInput: HandlerInput, error: Error): Response {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const request = handlerInput.requestEnvelope.request as IntentRequest;
        const speechLocal = SpeechLocal.getInstance(requestAttributes);

        const speechOutput = speechLocal.getSpeechOutput("I_DID_NOT_UNDERSTAND");

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .withSimpleCard(speechOutput, speechOutput)
            .getResponse();
    }

};