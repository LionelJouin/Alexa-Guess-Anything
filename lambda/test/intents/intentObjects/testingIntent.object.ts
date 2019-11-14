import { RequestEnvelope } from "ask-sdk-model";

export const intentObject = <RequestEnvelope>(
    {
        "context": {
            "System": {}
        },
        "request": {
            "type": "IntentRequest",
            "locale": "fr-FR",
            "intent": {
                "name": "AMAZON.HelpIntent"
            }
        }
    }
);