import { Game } from '../../src/models/game';
import { expect } from 'chai';
import 'mocha';

describe('Game', () => {

    it('Game should not be finished', () => {
        let game = new Game();
        expect(game.isFinished()).to.equal(false);
    });

});