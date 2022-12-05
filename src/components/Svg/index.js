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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var clsx_1 = __importDefault(require("clsx"));
var styles_module_css_1 = __importDefault(require("./styles.module.css"));
function Svg(props) {
    var svgClass = props.svgClass, colorAttr = props.colorAttr, children = props.children, _a = props.color, color = _a === void 0 ? 'inherit' : _a, _b = props.size, size = _b === void 0 ? 'medium' : _b, _c = props.viewBox, viewBox = _c === void 0 ? '0 0 24 24' : _c, rest = __rest(props, ["svgClass", "colorAttr", "children", "color", "size", "viewBox"]);
    return (react_1["default"].createElement("svg", __assign({ viewBox: viewBox, color: colorAttr, "aria-hidden": true, className: (0, clsx_1["default"])(styles_module_css_1["default"].svgIcon, styles_module_css_1["default"][color], styles_module_css_1["default"][size], svgClass) }, rest), children));
}
exports["default"] = Svg;
