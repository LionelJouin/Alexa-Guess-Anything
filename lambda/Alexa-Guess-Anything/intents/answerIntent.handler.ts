import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response, IntentRequest } from "ask-sdk-model";

export class AnswerIntentHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'AnswerIntent';
    }

    public handle(handlerInput: HandlerInput): Response {
        const request = handlerInput.requestEnvelope.request as IntentRequest;
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        var answer = +request.intent.slots!.answer.value;

        var speechText = "";

        if (answer < attributes.expectedAnswer) {
            speechText = "C'est plus !";
            attributes.counter++;
        } else if (answer > attributes.expectedAnswer) {
            speechText = "C'est moins !";
            attributes.counter++;
        } else {
            speechText = "bien ouej, vous avez " + attributes.counter;
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(speechText, speechText)
            .getResponse();
    }

};