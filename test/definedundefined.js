'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../rules/definedundefined');
const RuleTester = require('eslint').RuleTester;
const commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const eslintTester = new RuleTester();
eslintTester.run('definedundefined', rule, {
    valid: [
        'angular.isUndefined(toto)',
        'angular.isDefined(toto)',
        // possible false positives
        'variable === otherValue',
        'variable === null',
        'variable > undefined',
        'angular.isString(null)'
    ].concat(commonFalsePositives),
    invalid: [
        {code: 'variable === undefined', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'undefined === variable', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'undefined !== variable', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'variable !== undefined', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'variable == undefined', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'undefined == variable', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'undefined != variable', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'variable != undefined', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'typeof variable === "undefined"', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: 'typeof variable !== "undefined"', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: '"undefined" == typeof variable', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: '"undefined" != typeof variable', errors: [{message: 'You should not use directly the "undefined" keyword. Prefer angular.isUndefined or angular.isDefined'}]},
        {code: '!angular.isUndefined(variable)', errors: [{message: 'Instead of !angular.isUndefined, you can use the out-of-box angular.isDefined method'}]},
        {code: '!angular.isDefined(variable)', errors: [{message: 'Instead of !angular.isDefined, you can use the out-of-box angular.isUndefined method'}]}
    ]
});
