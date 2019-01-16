import * as Alexa from "ask-sdk-core";
import * as Intent from "./intents"
import * as Errors from "./errors";
import * as Interceptors from "./interceptors";

export const handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        new Intent.LaunchRequestHandler(),
        new Intent.SessionEndedRequestHandler(),
        new Intent.HelpIntentHandler(),
        new Intent.ExitIntentHandler(),

        new Intent.TestIntentHandler(),
        new Intent.AbcIntentHandler(),
        new Intent.StartIntentHandler(),
        new Intent.AnswerIntentHandler()
    )
    .addErrorHandlers(
        new Errors.Unknown(),
        new Errors.Unexpected()
    )
    .addRequestInterceptors(
        new Interceptors.Localization()
    )
    .lambda();