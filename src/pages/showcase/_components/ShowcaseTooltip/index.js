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
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var react_popper_1 = require("react-popper");
var styles_module_css_1 = __importDefault(require("./styles.module.css"));
function Tooltip(_a) {
    var children = _a.children, id = _a.id, anchorEl = _a.anchorEl, text = _a.text;
    var _b = (0, react_1.useState)(false), open = _b[0], setOpen = _b[1];
    var _c = (0, react_1.useState)(null), referenceElement = _c[0], setReferenceElement = _c[1];
    var _d = (0, react_1.useState)(null), popperElement = _d[0], setPopperElement = _d[1];
    var _e = (0, react_1.useState)(null), arrowElement = _e[0], setArrowElement = _e[1];
    var _f = (0, react_1.useState)(null), container = _f[0], setContainer = _f[1];
    var _g = (0, react_popper_1.usePopper)(referenceElement, popperElement, {
        modifiers: [
            {
                name: 'arrow',
                options: {
                    element: arrowElement
                }
            },
            {
                name: 'offset',
                options: {
                    offset: [0, 8]
                }
            },
        ]
    }), popperStyles = _g.styles, attributes = _g.attributes;
    var timeout = (0, react_1.useRef)(null);
    var tooltipId = "".concat(id, "_tooltip");
    (0, react_1.useEffect)(function () {
        if (anchorEl) {
            if (typeof anchorEl === 'string') {
                setContainer(document.querySelector(anchorEl));
            }
            else {
                setContainer(anchorEl);
            }
        }
        else {
            setContainer(document.body);
        }
    }, [container, anchorEl]);
    (0, react_1.useEffect)(function () {
        var showEvents = ['mouseenter', 'focus'];
        var hideEvents = ['mouseleave', 'blur'];
        var handleOpen = function () {
            // There is no point in displaying an empty tooltip.
            if (text === '') {
                return;
            }
            // Remove the title ahead of time to avoid displaying
            // two tooltips at the same time (native + this one).
            referenceElement === null || referenceElement === void 0 ? void 0 : referenceElement.removeAttribute('title');
            timeout.current = window.setTimeout(function () {
                setOpen(true);
            }, 400);
        };
        var handleClose = function () {
            clearInterval(timeout.current);
            setOpen(false);
        };
        if (referenceElement) {
            showEvents.forEach(function (event) {
                referenceElement.addEventListener(event, handleOpen);
            });
            hideEvents.forEach(function (event) {
                referenceElement.addEventListener(event, handleClose);
            });
        }
        return function () {
            if (referenceElement) {
                showEvents.forEach(function (event) {
                    referenceElement.removeEventListener(event, handleOpen);
                });
                hideEvents.forEach(function (event) {
                    referenceElement.removeEventListener(event, handleClose);
                });
            }
        };
    }, [referenceElement, text]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].cloneElement(children, {
            ref: setReferenceElement,
            'aria-describedby': open ? tooltipId : undefined
        }),
        container
            ? react_dom_1["default"].createPortal(open && (react_1["default"].createElement("div", __assign({ id: tooltipId, role: "tooltip", ref: setPopperElement, className: styles_module_css_1["default"].tooltip, style: popperStyles.popper }, attributes.popper),
                text,
                react_1["default"].createElement("span", { ref: setArrowElement, className: styles_module_css_1["default"].tooltipArrow, style: popperStyles.arrow }))), container)
            : container));
}
exports["default"] = Tooltip;
