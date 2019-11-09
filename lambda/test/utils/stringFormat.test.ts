import { stringFormat } from '../../src/utils/stringFormat';
import { expect } from 'chai';
import 'mocha';

describe('stringFormat', () => {

    it('Should return empty string', () => {
        expect(stringFormat("")).to.equal("");
    });
    
    it('Should return Hello World', () => {
        expect(stringFormat("Hello Hello")).to.equal("Hello Hello");
    });

    it('Should return Hello - World', () => {
        var a = "Hello";
        var b = "World";
        expect(stringFormat("{0} - {1}", a, b)).to.equal("Hello - World");
    });

    it('Should return Hello - World', () => {
        var a = "Hello";
        var b = "World";
        expect(stringFormat("{1} - {0}", a, b)).to.equal("World - Hello");
    });

});