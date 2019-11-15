import { expect } from 'chai';
import { ResponseEnvelope } from 'ask-sdk-model';
import { handler } from '../../../src/index';
import { intentObject } from '../intentObjects/launchRequest.object';
import 'mocha';

let skill_response: ResponseEnvelope;

describe('LaunchRequest', function () {

    // // pre-requisites
    // before(() => {
    //     return new Promise((resolve, reject) => {
    //         handler(intentObject, null, (error, responseEnvelope) => {
    //             skill_response = responseEnvelope;
    //             resolve();
    //         });
    //     });
    // });

    // it('it responses with valid response structure ', () => {
    // });

});
