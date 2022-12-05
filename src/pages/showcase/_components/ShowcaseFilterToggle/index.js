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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.readOperator = exports.OperatorQueryKey = void 0;
var react_1 = __importStar(require("react"));
var clsx_1 = __importDefault(require("clsx"));
var router_1 = require("@docusaurus/router");
var index_1 = require("../../index");
var styles_module_css_1 = __importDefault(require("./styles.module.css"));
exports.OperatorQueryKey = 'operator';
function readOperator(search) {
    var _a;
    return ((_a = new URLSearchParams(search).get(exports.OperatorQueryKey)) !== null && _a !== void 0 ? _a : 'OR');
}
exports.readOperator = readOperator;
function ShowcaseFilterToggle() {
    var id = 'showcase_filter_toggle';
    var location = (0, router_1.useLocation)();
    var history = (0, router_1.useHistory)();
    var _a = (0, react_1.useState)(false), operator = _a[0], setOperator = _a[1];
    (0, react_1.useEffect)(function () {
        setOperator(readOperator(location.search) === 'AND');
    }, [location]);
    var toggleOperator = (0, react_1.useCallback)(function () {
        setOperator(function (o) { return !o; });
        var searchParams = new URLSearchParams(location.search);
        searchParams["delete"](exports.OperatorQueryKey);
        if (!operator) {
            searchParams.append(exports.OperatorQueryKey, 'AND');
        }
        history.push(__assign(__assign({}, location), { search: searchParams.toString(), state: (0, index_1.prepareUserState)() }));
    }, [operator, location, history]);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("input", { type: "checkbox", id: id, className: "screen-reader-only", "aria-label": "Toggle between or and and for the tags you selected", onChange: toggleOperator, onKeyDown: function (e) {
                if (e.key === 'Enter') {
                    toggleOperator();
                }
            }, checked: operator }),
        react_1["default"].createElement("label", { htmlFor: id, className: (0, clsx_1["default"])(styles_module_css_1["default"].checkboxLabel, 'shadow--md') },
            react_1["default"].createElement("span", { className: styles_module_css_1["default"].checkboxLabelOr }, "OR"),
            react_1["default"].createElement("span", { className: styles_module_css_1["default"].checkboxLabelAnd }, "AND"))));
}
exports["default"] = ShowcaseFilterToggle;
