import { expect } from 'chai';
import { SpeechLocal } from '../../src/utils/speechLocal';
import { handler } from '../../src/index';
import { intentObject } from '../intents/intentObjects/testingIntent.object';
import 'mocha';

describe('SpeechLocal', () => {

    before(() => {
        return new Promise((resolve, reject) => {
            handler(intentObject, null, (error, responseEnvelope) => {
                resolve();
            });
        });
    });

    it('instances should be equal', () => {
        expect(SpeechLocal.getInstance()).to.equal(SpeechLocal.getInstance());
    });

});