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
        // if (request.type === 'IntentRequest' && request.intent.slots !== undefined) {
        //     var answer = request.intent.slots.answer.value;
        // }
        var answer = request.intent.slots!.answer.value;
        console.log(answer);
        // const speechText = "La reponse est ";
        const speechText = "La reponse est " + answer;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(speechText, speechText)
            .getResponse();
    }

};