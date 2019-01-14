import { ErrorHandler, HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export class Unknown implements ErrorHandler {

    public canHandle(_: HandlerInput, error: Error): boolean {
        return true;
        // return error.name === "UnknownError";
    }

    public handle(handlerInput: HandlerInput, error: Error): Response {
        const speechText = "Inconnu";

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(speechText, speechText)
            .getResponse();
    }

};