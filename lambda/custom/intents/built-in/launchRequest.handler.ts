import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { State } from "../../models/state.enum";
import { ErrorTypes } from "../../errors/ErrorTypes";

export class LaunchRequestHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    }

    public handle(handlerInput: HandlerInput): Response {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const speechText = requestAttributes.t("WELCOME_MESSAGE");

        if (SessionAttributes.state === State.INGAME) {
            let error = new Error('State in game');
            error.name = ErrorTypes.WRONG_STATE;
            throw error;
        }

        SessionAttributes.state = State.MENU;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(speechText, speechText)
            .getResponse();
    }

};