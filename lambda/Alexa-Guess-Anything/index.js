const Alexa = require('ask-sdk-core');
const skillBuilder = Alexa.SkillBuilders.custom();

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak('ERROR_MESSAGE')
      .reprompt('ERROR_MESSAGE')
      .getResponse();
  },
};


const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak('STOP_MESSAGE')
      .getResponse();
  },
};



exports.handler = skillBuilder
  .addRequestHandlers(
    ExitHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();