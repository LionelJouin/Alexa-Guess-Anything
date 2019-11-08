import { Player } from '../../src/models/player';
import { expect } from 'chai';
import 'mocha';

describe('Mistake counter', () => {

    it('should return 0', () => {
        let player = new Player(0);
        expect(player.getMistakeCount()).to.equal(0);
    });

    it('should return 1', () => {
        let player = new Player(0);
        player.addMistake();
        expect(player.getMistakeCount()).to.equal(1);
    });

});

describe('Point counter', () => {

    it('should return 0', () => {
        let player = new Player(0);
        expect(player.getPointCount()).to.equal(0);
    });

    it('should return 1', () => {
        let player = new Player(0);
        player.addPoint();
        expect(player.getPointCount()).to.equal(1);
    });

});

describe('Id', () => {

    it('should return 0', () => {
        let player = new Player(0);
        expect(player.getId()).to.equal(0);
    });

});