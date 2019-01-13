import * as Alexa from "ask-sdk-core";
import * as Intent from "./intents"

export const handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        Intent.CoucouHandler
    )
    .addErrorHandlers(
    )
    .addRequestInterceptors(
    )
    .lambda();