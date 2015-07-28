var chai = require('chai');
var assert = chai.assert;
var coder = require('../lib/solidity/coder');


describe('lib/solidity/coder', function () {
    describe('encodeParam', function () {
        var test = function (t) {
            it('should turn ' + t.value + ' to ' + t.expected, function () {
                assert.equal(coder.encodeParam(t.type, t.value), t.expected);
            });
        };


        test({ type: 'address', value: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',          
                                                    expected: '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1'});
        test({ type: 'address[2]', value: ['0x407d73d8a49eeb85d32cf465507dd71d507100c1', '0x407d73d8a49eeb85d32cf465507dd71d507100c3'],          
                                                    expected: '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1' +
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3' });
        test({ type: 'address[]', value: ['0x407d73d8a49eeb85d32cf465507dd71d507100c1', '0x407d73d8a49eeb85d32cf465507dd71d507100c3'],          
                                                    expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              '0000000000000000000000000000000000000000000000000000000000000002' +
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1' +
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3' });
        test({ type: 'address[2][]', value: [['0x407d73d8a49eeb85d32cf465507dd71d507100c1', '0x407d73d8a49eeb85d32cf465507dd71d507100c2'], 
                                               ['0x407d73d8a49eeb85d32cf465507dd71d507100c3', '0x407d73d8a49eeb85d32cf465507dd71d507100c4']],
                                                    expected: '0000000000000000000000000000000000000000000000000000000000000040' +
                                                              '00000000000000000000000000000000000000000000000000000000000000a0' +
                                                              '0000000000000000000000000000000000000000000000000000000000000002' +
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1' +
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c2' +
                                                              '0000000000000000000000000000000000000000000000000000000000000002' +
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3' +
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c4' });
        test({ type: 'address[][2]', value: [['0x407d73d8a49eeb85d32cf465507dd71d507100c1', '0x407d73d8a49eeb85d32cf465507dd71d507100c2'], 
                                               ['0x407d73d8a49eeb85d32cf465507dd71d507100c3', '0x407d73d8a49eeb85d32cf465507dd71d507100c4']],
                                                    expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              '0000000000000000000000000000000000000000000000000000000000000002' +
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1' + 
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c2' +
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3' +
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c4' });
        test({ type: 'address[][]', value: [['0x407d73d8a49eeb85d32cf465507dd71d507100c1'], 
                                               ['0x407d73d8a49eeb85d32cf465507dd71d507100c3']],
                                                    expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              '0000000000000000000000000000000000000000000000000000000000000002' + /* 20 */
                                                              '0000000000000000000000000000000000000000000000000000000000000080' +
                                                              '00000000000000000000000000000000000000000000000000000000000000c0' +
                                                              '0000000000000000000000000000000000000000000000000000000000000001' + /* 80 */
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1' + /* a0 */
                                                              '0000000000000000000000000000000000000000000000000000000000000001' + /* c0 */
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3' });
        test({ type: 'address[][]', value: [['0x407d73d8a49eeb85d32cf465507dd71d507100c1', '0x407d73d8a49eeb85d32cf465507dd71d507100c2'], 
                                               ['0x407d73d8a49eeb85d32cf465507dd71d507100c3', '0x407d73d8a49eeb85d32cf465507dd71d507100c4']],
                                                    expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              '0000000000000000000000000000000000000000000000000000000000000002' + /* 20 */
                                                              '0000000000000000000000000000000000000000000000000000000000000080' +
                                                              '00000000000000000000000000000000000000000000000000000000000000e0' +
                                                              '0000000000000000000000000000000000000000000000000000000000000002' + /* 80 */
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1' + /* a0 */
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c2' +
                                                              '0000000000000000000000000000000000000000000000000000000000000002' + /* e0 */
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3' +
                                                              '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c4' });
        test({ type: 'bool', value: true,           expected: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ type: 'bool', value: false,          expected: '0000000000000000000000000000000000000000000000000000000000000000'});
        test({ type: 'bool[2]', value: [true, false],
                                                    expected: '0000000000000000000000000000000000000000000000000000000000000001' + 
                                                              '0000000000000000000000000000000000000000000000000000000000000000'});
        test({ type: 'bool[]', value: [true, true, false],
                                                    expected: '0000000000000000000000000000000000000000000000000000000000000020' + 
                                                              '0000000000000000000000000000000000000000000000000000000000000003' + 
                                                              '0000000000000000000000000000000000000000000000000000000000000001' + 
                                                              '0000000000000000000000000000000000000000000000000000000000000001' + 
                                                              '0000000000000000000000000000000000000000000000000000000000000000'});

        test({ type: 'int', value: 1,               expected: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ type: 'int', value: 16,              expected: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ type: 'int', value: -1,              expected: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'});
        test({ type: 'int', value: 0.1,             expected: '0000000000000000000000000000000000000000000000000000000000000000'});
        test({ type: 'int', value: 3.9,             expected: '0000000000000000000000000000000000000000000000000000000000000003'});
        test({ type: 'int256', value: 1,            expected: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ type: 'int256', value: 16,           expected: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ type: 'int256', value: -1,           expected: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'});
        //test({ type: 'bytes32', value: '0x6761766f66796f726b',
                                                    //expected: '6761766f66796f726b0000000000000000000000000000000000000000000000'});
        //test({ type: 'bytes32', value: '0x731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b', 
                                                    //expected: '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
        //test({ type: 'bytes32', value: '0x02838654a83c213dae3698391eabbd54a5b6e1fb3452bc7fa4ea0dd5c8ce7e29', 
                                                    //expected: '02838654a83c213dae3698391eabbd54a5b6e1fb3452bc7fa4ea0dd5c8ce7e29'});
        //test({ type: 'bytes', value: '0x6761766f66796f726b',
                                                    //expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000009' +
                                                              //'6761766f66796f726b0000000000000000000000000000000000000000000000'});
        //test({ type: 'bytes', value: '0x731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',   
                                                    //expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
        //test({ type: 'string', value: 'gavofyork',  expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000009' +
                                                              //'6761766f66796f726b0000000000000000000000000000000000000000000000'});
        //test({ type: 'bytes', value: '0xc3a40000c3a4',  
                                                    //expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000006' +
                                                              //'c3a40000c3a40000000000000000000000000000000000000000000000000000'});
        //test({ type: 'bytes32', value: '0xc3a40000c3a4',  
                                                    //expected: 'c3a40000c3a40000000000000000000000000000000000000000000000000000'});
        //test({ type: 'bytes64', value: '0xc3a40000c3a40000000000000000000000000000000000000000000000000000' +
                                         //'c3a40000c3a40000000000000000000000000000000000000000000000000000',  
                                                    //expected: 'c3a40000c3a40000000000000000000000000000000000000000000000000000' +
                                                              //'c3a40000c3a40000000000000000000000000000000000000000000000000000'});
        //test({ type: 'string', value: 'Ã¤Ã¤',  
                                                    //expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000008' +
                                                              //'c383c2a4c383c2a4000000000000000000000000000000000000000000000000'});
        //test({ type: 'string', value: 'ü',  
                                                    //expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000002' +
                                                              //'c3bc000000000000000000000000000000000000000000000000000000000000'});
        //test({ type: 'string', value: 'Ã',  
                                                    //expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000002' +
                                                              //'c383000000000000000000000000000000000000000000000000000000000000'});
        //test({ type: 'int[]', value: [],            expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000000'});
        //test({ type: 'int[]', value: [3],           expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000001' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000003'});
        //test({ type: 'int256[]', value: [3],        expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000001' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000003'});
        //test({ type: 'int[]', value: [1,2,3],       expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000003' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000001' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000002' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000003'});



        //test({ type: 'real', value: 1,              expected: '0000000000000000000000000000000100000000000000000000000000000000'});
        //test({ type: 'real', value: 2.125,          expected: '0000000000000000000000000000000220000000000000000000000000000000'});
        //test({ type: 'real', value: 8.5,            expected: '0000000000000000000000000000000880000000000000000000000000000000'});
        //test({ type: 'real', value: -1,             expected: 'ffffffffffffffffffffffffffffffff00000000000000000000000000000000'});
        //test({ type: 'ureal', value: 1,             expected: '0000000000000000000000000000000100000000000000000000000000000000'});
        //test({ type: 'ureal', value: 2.125,         expected: '0000000000000000000000000000000220000000000000000000000000000000'});
        //test({ type: 'ureal', value: 8.5,           expected: '0000000000000000000000000000000880000000000000000000000000000000'});
        //test({ type: 'bytes', value: '0x131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
                                       //'231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',       
                                                    //expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000040' + 
                                                              //'131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
                                                              //'231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
        //test({ type: 'bytes', value: '0x131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
                                       //'231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
                                       //'331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',       
                                                    //expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                              //'0000000000000000000000000000000000000000000000000000000000000060' + 
                                                              //'131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
                                                              //'231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
                                                              //'331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
        //test({ type: 'string', value: 'welcome to ethereum. welcome to ethereum. welcome to ethereum.',
                                                    //expected: '0000000000000000000000000000000000000000000000000000000000000020' + 
                                                              //'000000000000000000000000000000000000000000000000000000000000003e' + 
                                                              //'77656c636f6d6520746f20657468657265756d2e2077656c636f6d6520746f20' + 
                                                              //'657468657265756d2e2077656c636f6d6520746f20657468657265756d2e0000'});
    });
});


describe('lib/solidity/coder', function () {
    describe('encodeParams', function () {
        var test = function (t) {
            it('should turn ' + t.values + ' to ' + t.expected, function () {
                assert.equal(coder.encodeParams(t.types, t.values), t.expected);
            });
        };

         
        test({ types: ['address', 'address'], values: ['0x407d73d8a49eeb85d32cf465507dd71d507100c1', '0x407d73d8a49eeb85d32cf465507dd71d507100c3'],          
                                                            expected: '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1' + 
                                                                      '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c3'});
        test({ types: ['bool[2]', 'bool[3]'], values: [[true, false], [false, false, true]],
                                                    expected: '0000000000000000000000000000000000000000000000000000000000000001' + 
                                                              '0000000000000000000000000000000000000000000000000000000000000000' + 
                                                              '0000000000000000000000000000000000000000000000000000000000000000' + 
                                                              '0000000000000000000000000000000000000000000000000000000000000000' + 
                                                              '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ types: ['int'], values: [1],                 expected: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ types: ['int'], values: [16],                expected: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ types: ['int'], values: [-1],                expected: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'});
        test({ types: ['int256'], values: [1],              expected: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ types: ['int256'], values: [16],             expected: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ types: ['int256'], values: [-1],             expected: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'});
        //test({ types: ['bytes32'], values: ['0x6761766f66796f726b'],   
                                                            //expected: '6761766f66796f726b0000000000000000000000000000000000000000000000'});
        //test({ types: ['string'], values: ['gavofyork'],    expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000009' +
                                                                      //'6761766f66796f726b0000000000000000000000000000000000000000000000'});
        //test({ types: ['int[]'], values: [[3]],             expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000001' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000003'});
        //test({ types: ['int256[]'], values: [[3]],          expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000001' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000003'});
        //test({ types: ['int256[]'], values: [[1,2,3]],      expected: '0000000000000000000000000000000000000000000000000000000000000020' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000003' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000001' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000002' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000003'});
        //test({ types: ['int[]', 'int[]'], values: [[1,2], [3,4]],             
                                                            //expected: '0000000000000000000000000000000000000000000000000000000000000040' +
                                                                      //'00000000000000000000000000000000000000000000000000000000000000a0' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000002' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000001' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000002' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000002' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000003' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000004'});
        //test({ types: ['bytes32', 'int'], values: ['0x6761766f66796f726b', 5],
                                                            //expected: '6761766f66796f726b0000000000000000000000000000000000000000000000' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000005'});
        //test({ types: ['int', 'bytes32'], values: [5, '0x6761766f66796f726b'],
                                                            //expected: '0000000000000000000000000000000000000000000000000000000000000005' + 
                                                                      //'6761766f66796f726b0000000000000000000000000000000000000000000000'});
        //test({ types: ['string', 'int'], values: ['gavofyork', 5],
                                                            //expected: '0000000000000000000000000000000000000000000000000000000000000040' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000005' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000009' + 
                                                                      //'6761766f66796f726b0000000000000000000000000000000000000000000000'});
        //test({ types: ['string', 'bool', 'int[]'], values: ['gavofyork', true, [1, 2, 3]],
                                                            //expected: '0000000000000000000000000000000000000000000000000000000000000060' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000001' + 
                                                                      //'00000000000000000000000000000000000000000000000000000000000000a0' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000009' + 
                                                                      //'6761766f66796f726b0000000000000000000000000000000000000000000000' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000003' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000001' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000002' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000003'});
        //test({ types: ['string', 'int[]'], values: ['gavofyork', [1, 2, 3]],
                                                            //expected: '0000000000000000000000000000000000000000000000000000000000000040' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000080' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000009' + 
                                                                      //'6761766f66796f726b0000000000000000000000000000000000000000000000' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000003' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000001' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000002' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000003'});
        //test({ types: ['int', 'string'], values: [5, 'gavofyork'],
                                                            //expected: '0000000000000000000000000000000000000000000000000000000000000005' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000040' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000009' + 
                                                                      //'6761766f66796f726b0000000000000000000000000000000000000000000000'});
        //test({ types: ['int', 'string', 'int', 'int', 'int', 'int[]'], values: [1, 'gavofyork', 2, 3, 4, [5, 6, 7]],
                                                            //expected: '0000000000000000000000000000000000000000000000000000000000000001' +
                                                                      //'00000000000000000000000000000000000000000000000000000000000000c0' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000002' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000003' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000004' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000100' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000009' +
                                                                      //'6761766f66796f726b0000000000000000000000000000000000000000000000' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000003' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000005' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000006' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000007'});
        //test({ types: ['int', 'bytes', 'int', 'bytes'], values: [
                                                                    //5,
                                                                    //'0x131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
                                                                      //'231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
                                                                    //3,
                                                                    //'0x331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
                                                                      //'431a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
                                                                    //],
                                                            //expected: '0000000000000000000000000000000000000000000000000000000000000005' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000080' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000003' + 
                                                                      //'00000000000000000000000000000000000000000000000000000000000000e0' + 
                                                                      //'0000000000000000000000000000000000000000000000000000000000000040' + 
                                                                      //'131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
                                                                      //'231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
                                                                      //'0000000000000000000000000000000000000000000000000000000000000040' + 
                                                                      //'331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
                                                                      //'431a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
    });
});


