"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.updateDOMColors = exports.getAdjustedColors = exports.darkStorage = exports.lightStorage = exports.DARK_BACKGROUND_COLOR = exports.LIGHT_BACKGROUND_COLOR = exports.DARK_PRIMARY_COLOR = exports.LIGHT_PRIMARY_COLOR = exports.COLOR_SHADES = void 0;
var color_1 = __importDefault(require("color"));
var theme_common_1 = require("@docusaurus/theme-common");
exports.COLOR_SHADES = {
    '--ifm-color-primary': {
        adjustment: 0,
        adjustmentInput: '0',
        displayOrder: 3,
        codeOrder: 0
    },
    '--ifm-color-primary-dark': {
        adjustment: 0.1,
        adjustmentInput: '10',
        displayOrder: 4,
        codeOrder: 1
    },
    '--ifm-color-primary-darker': {
        adjustment: 0.15,
        adjustmentInput: '15',
        displayOrder: 5,
        codeOrder: 2
    },
    '--ifm-color-primary-darkest': {
        adjustment: 0.3,
        adjustmentInput: '30',
        displayOrder: 6,
        codeOrder: 3
    },
    '--ifm-color-primary-light': {
        adjustment: -0.1,
        adjustmentInput: '-10',
        displayOrder: 2,
        codeOrder: 4
    },
    '--ifm-color-primary-lighter': {
        adjustment: -0.15,
        adjustmentInput: '-15',
        displayOrder: 1,
        codeOrder: 5
    },
    '--ifm-color-primary-lightest': {
        adjustment: -0.3,
        adjustmentInput: '-30',
        displayOrder: 0,
        codeOrder: 6
    }
};
exports.LIGHT_PRIMARY_COLOR = '#2e8555';
exports.DARK_PRIMARY_COLOR = '#25c2a0';
exports.LIGHT_BACKGROUND_COLOR = '#ffffff';
exports.DARK_BACKGROUND_COLOR = '#181920';
// sessionStorage allows resetting everything next time users visit the site
exports.lightStorage = (0, theme_common_1.createStorageSlot)('ifm-theme-colors-light', {
    persistence: 'sessionStorage'
});
exports.darkStorage = (0, theme_common_1.createStorageSlot)('ifm-theme-colors-dark', {
    persistence: 'sessionStorage'
});
function getAdjustedColors(shades, baseColor) {
    return Object.keys(shades).map(function (shade) { return (__assign(__assign({}, shades[shade]), { variableName: shade, hex: (0, color_1["default"])(baseColor).darken(shades[shade].adjustment).hex() })); });
}
exports.getAdjustedColors = getAdjustedColors;
function updateDOMColors(_a, isDarkTheme) {
    var shades = _a.shades, baseColor = _a.baseColor, background = _a.background;
    var styleSheet = Array.from(document.styleSheets).find(function (item) { var _a; return (_a = item.href) === null || _a === void 0 ? void 0 : _a.match(/styles(?:\.[\da-f]+)?\.css/); });
    var rules = Array.from(styleSheet.cssRules);
    // The rule that looks the most like definition for custom theme colors
    var ruleToDelete = rules.findIndex(function (rule) {
        return rule.selectorText ===
            (isDarkTheme ? '[data-theme="dark"]' : '[data-theme="light"]') &&
            Array.from(rule.style).includes('--ifm-color-primary') &&
            rule.style.length < 10;
    });
    if (ruleToDelete >= 0) {
        styleSheet.deleteRule(ruleToDelete);
    }
    var overrideStyle = "".concat(isDarkTheme ? '[data-theme="dark"]' : '[data-theme="light"]', " {\n  ").concat(getAdjustedColors(shades, baseColor)
        .map(function (value) { return "  ".concat(value.variableName, ": ").concat(value.hex, ";"); })
        .join('\n'), "\n  --ifm-background-color: ").concat(background, ";\n}");
    styleSheet.insertRule(overrideStyle, styleSheet.cssRules.length - 1);
}
exports.updateDOMColors = updateDOMColors;
