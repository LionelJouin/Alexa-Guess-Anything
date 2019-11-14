import { expect } from 'chai';
import { hash } from '../../src/utils/hash';
import 'mocha';

describe('hash', () => {

    it('hashs should be equal', () => {
        expect(hash("abc")).to.equal(hash("abc"));
        expect(hash("Lorem ipsum dolor sit amet.")).to.equal(hash("Lorem ipsum dolor sit amet."));
        expect(hash("")).to.equal(hash(""));
        expect(hash("aaa")).to.equal(hash("aaa"));
        expect(hash("1f@$@#.*-435")).to.equal(hash("1f@$@#.*-435"));
    });

    it('hashs should not be equal', () => {
        expect(hash("abc")).to.not.equal(hash("Lorem ipsum dolor sit amet."));
        expect(hash("aaa")).to.not.equal(hash("a"));
        expect(hash("1f@$@#.*-435")).to.not.equal(hash("[}]()#@$%"));
    });

});