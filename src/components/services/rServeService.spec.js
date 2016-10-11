/**
 * Created by piotrzakrzewski on 16/09/16.
 */
'use strict';

xdescribe('rServe Service Unit Tests', function () {
    var rServeService, $httpBackend, authRequestHandler, MASTER_ENDPOINT_CONFIG;
    var baseURL = 'http://transmart-gb.thehyve.net/transmart';
    // Load the transmartBaseUi module, which contains the directive
    beforeEach(function () {
        module('transmartBaseUi');
        module('tmEndpoints');
        module('smartRApp');
        MASTER_ENDPOINT_CONFIG = {
            "title": "transmart-gb",
            "url": "http://transmart-gb.thehyve.net/transmart/v1",
            "isOAuth": true,
            "isMaster": true
        }

        module(function ($provide) {
           $provide.service('EndpointService', function() {
               this.initializeEndpoints = jasmine.createSpy('initializeEndpoints')
                   .and.callFake(function () {
                       this.masterEndpoint = MASTER_ENDPOINT_CONFIG;
               });
               this.getMasterEndpoint = jasmine.createSpy('getMasterEndpoint')
                   .and.callFake(function () {
                       return {
                           url: baseURL
                       }
               });
           });
        });
    });


    beforeEach(inject(function (_rServeService_, _$httpBackend_) {
        rServeService = _rServeService_;
        $httpBackend = _$httpBackend_;

        $httpBackend.when('POST', baseURL + '/RSession/deleteFiles')
            .respond(201, '');
        $httpBackend.when('POST', baseURL + '/RSession/delete')
            .respond(201, '');
        $httpBackend.when('GET', 'http://transmart-gb.thehyve.net/transmart/ScriptExecution/' +
            'downloadFile?sessionId=null&executionId=bogus-execution-id&filename=bogus-file')
            .respond(201, '');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('rServeService', function () {

        it('should be defined', function () {
            expect(rServeService).toBeDefined();
        });

        it('should call deleteSessionFiles', function () {
            $httpBackend.expectPOST(baseURL + '/RSession/deleteFiles');
            rServeService.deleteSessionFiles('bogus-session-id');
            $httpBackend.flush();
        });

        it('should call destroySession', function () {
            $httpBackend.expectPOST(baseURL + '/RSession/delete');
            rServeService.destroySession('bogus-session-id');
            $httpBackend.flush();
        });

        it('should call downloadJsonFile', function () {
            var bogusId = 'bogus-execution-id';
            var bogusFile = 'bogus-file';
            var downloadUrl = rServeService.urlForFile(bogusId, bogusFile);
            $httpBackend.expectGET(downloadUrl);
            rServeService.downloadJsonFile(bogusId, bogusFile);
            $httpBackend.flush();
        });

        it('should get correct URL for json resource', function () {
            var bogusId = 'bogus-execution-id';
            var bogusFile = 'bogus-file';
            var resultingUrl = rServeService.urlForFile(bogusId, bogusFile);
            expect(resultingUrl)
                .toBe('http://transmart-gb.thehyve.net/transmart/ScriptExecution/downloadFile?sessionId=null' +
                    '&executionId=bogus-execution-id&filename=bogus-file')
        })


    });

});
