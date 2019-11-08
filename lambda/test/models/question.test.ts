import { Question } from '../../src/models/question';
import { expect } from 'chai';
import 'mocha';

describe('Question', () => {

    it('Question hash should not be empty', () => {
        let question = new Question();
        expect(question.getHash()).to.not.equal("");
    });

});