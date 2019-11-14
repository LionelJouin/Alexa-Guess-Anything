import { Question } from '../../src/models/question';
import { expect } from 'chai';
import { handler } from '../../src/index';
import { intentObject } from '../intents/intentObjects/testingIntent.object';
import 'mocha';

describe('Question', () => {

    before(() => {
        return new Promise((resolve, reject) => {
            handler(intentObject, null, (error, responseEnvelope) => {
                resolve();
            });
        });
    });
    
    it('Question hash should not be empty', () => {
        let question = new Question("ABC", 0);
        expect(question.getHash()).to.not.equal("");
    });

});