import { RequestEnvelope } from "ask-sdk-model";

export const intentObject = <RequestEnvelope>(
  {
    "version": "1.0",
    "session": {
      "new": true,
      "sessionId": "amzn1.echo-api.session.123",
      "application": {
        "applicationId": "amzn1.ask.skill.123"
      },
      "user": {
        "userId": "amzn1.ask.account.123"
      }
    },
    "context": {
      "AudioPlayer": {
        "offsetInMilliseconds": 3160,
        "token": "0",
        "playerActivity": "STOPPED"
      },
      "System": {
        "application": {
          "applicationId": "amzn1.ask.skill.123"
        },
        "user": {
          "userId": "amzn1.ask.account.123"
        },
        "device": {
        }
      }
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "amzn1.echo-api.request.123",
      "timestamp": "2017-03-04T19:34:05Z",
      "locale": "fr-FR",
      "intent": {
        "name": "StartIntent"
      }
    }
  }
);