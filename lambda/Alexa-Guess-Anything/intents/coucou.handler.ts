import { RequestHandler } from "ask-sdk-core";
import { IntentTypes } from ".";

export const CoucouHandler: RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'CoucouIntent';
    },
    handle(handlerInput) {
        const speechText = "coucou";

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard("coucou", speechText)
            .getResponse();
    }
};