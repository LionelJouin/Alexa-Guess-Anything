import { ErrorHandler, HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export class Unexpected implements ErrorHandler {

    public canHandle(_: HandlerInput, error: Error): boolean {
        return false;
        // return error.name === "UnexpectedError";
    }

    public handle(handlerInput: HandlerInput, error: Error): Response {
        const speechText = "Inattendue";

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(speechText, speechText)
            .getResponse();
    }

};