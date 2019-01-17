import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export class SessionEndedRequestHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest';
    }

    public handle(handlerInput: HandlerInput): Response {
        return handlerInput.responseBuilder.getResponse();
    }

};