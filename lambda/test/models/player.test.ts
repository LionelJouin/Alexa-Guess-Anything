import { Player } from '../../src/models/player';
import { expect } from 'chai';
import { handler } from '../../src/index';
import { intentObject } from '../intents/intentObjects/testingIntent.object';
import 'mocha';

describe('Player', () => {

    before(() => {
        return new Promise((resolve, reject) => {
            handler(intentObject, null, (error, responseEnvelope) => {
                resolve();
            });
        });
    });

    it('Number of mistakes should be 0', () => {
        let player = new Player(0);
        expect(player.getMistakeCount()).to.equal(0);
    });

    it('Number of mistakes should be 1', () => {
        let player = new Player(0);
        player.addMistake();
        expect(player.getMistakeCount()).to.equal(1);
    });

    it('Number of points should be 0', () => {
        let player = new Player(0);
        expect(player.getPointCount()).to.equal(0);
    });

    it('Number of points should be 1', () => {
        let player = new Player(0);
        player.addPoint();
        expect(player.getPointCount()).to.equal(1);
    });

    it('Player id should be 0', () => {
        let player = new Player(0);
        expect(player.getId()).to.equal(0);
    });

});