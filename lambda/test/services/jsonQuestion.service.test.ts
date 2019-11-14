import { expect } from 'chai';
import { JsonQuestionService } from '../../src/services/jsonQuestion.service';
import { handler } from '../../src/index';
import { intentObject } from '../intents/intentObjects/testingIntent.object';
import 'mocha';

describe('JsonQuestionService', () => {

    before(() => {
        return new Promise((resolve, reject) => {
            handler(intentObject, null, (error, responseEnvelope) => {
                resolve();
            });
        });
    });

    it('should be equals with seed', () => {
        let service = new JsonQuestionService("fr-FR");
        expect(service.getQuestion(1).getSpeechOutput()).to.equal(service.getQuestion(1).getSpeechOutput());
        expect(service.getQuestion(5).getSpeechOutput()).to.equal(service.getQuestion(5).getSpeechOutput());
        expect(service.getQuestion(546).getSpeechOutput()).to.equal(service.getQuestion(546).getSpeechOutput());
        expect(service.getQuestion(164684).getSpeechOutput()).to.equal(service.getQuestion(164684).getSpeechOutput());
        expect(service.getQuestion(0).getSpeechOutput()).to.equal(service.getQuestion(0).getSpeechOutput());
        expect(service.getQuestion(-1).getSpeechOutput()).to.equal(service.getQuestion(-1).getSpeechOutput());
        expect(service.getQuestion(-646).getSpeechOutput()).to.equal(service.getQuestion(-646).getSpeechOutput());
    });

});