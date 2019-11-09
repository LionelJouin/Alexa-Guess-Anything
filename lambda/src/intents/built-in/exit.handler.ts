import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { SpeechLocal } from "../../utils/SpeechLocal";

export class ExitIntentHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent');
    }

    public handle(handlerInput: HandlerInput): Response {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechLocal = SpeechLocal.getInstance(requestAttributes);
        const speechOutput = speechLocal.getSpeechOutput("EXIT");

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    }

};