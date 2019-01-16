import { RequestInterceptor, HandlerInput } from "ask-sdk-core";
import { default as i18next } from 'i18next';
import * as sprintf from "i18next-sprintf-postprocessor";
import * as locales from "../utils/locales"

export class Localization implements RequestInterceptor {

    public process(handlerInput: HandlerInput) {

        const localizationClient: any = i18next.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            resources: locales,
        });
        localizationClient.localize = function localize() {
            const args = arguments;
            const values = [];
            for (let i = 1; i < args.length; i += 1) {
                values.push(args[i]);
            }
            const value = i18next.t(args[0], {
                returnObjects: true,
                postProcess: 'sprintf',
                sprintf: values,
            });
            if (Array.isArray(value)) {
                return value[Math.floor(Math.random() * value.length)];
            }
            return value;
        };
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function translate(...args: any) {
            return localizationClient.localize(...args);
        };

    }

};