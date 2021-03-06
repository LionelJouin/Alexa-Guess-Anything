import { Game } from '../../src/models/game';
import { expect } from 'chai';
import { handler } from '../../src/index';
import { intentObject } from '../intents/intentObjects/testingIntent.object';
import 'mocha';

describe('Game', () => {

    before(() => {
        return new Promise((resolve, reject) => {
            handler(intentObject, null, (error, responseEnvelope) => {
                resolve();
            });
        });
    });

    it('Game should not be finished', () => {
        let game = new Game();
        expect(game.isFinished()).to.equal(false);
    });

});