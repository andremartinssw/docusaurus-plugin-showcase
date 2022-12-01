/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { __assign } from "tslib";
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import styles from './styles.module.css';
export default function Tooltip(_a) {
    var children = _a.children, id = _a.id, anchorEl = _a.anchorEl, text = _a.text;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var _c = useState(null), referenceElement = _c[0], setReferenceElement = _c[1];
    var _d = useState(null), popperElement = _d[0], setPopperElement = _d[1];
    var _e = useState(null), arrowElement = _e[0], setArrowElement = _e[1];
    var _f = useState(null), container = _f[0], setContainer = _f[1];
    var _g = usePopper(referenceElement, popperElement, {
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
    var timeout = useRef(null);
    var tooltipId = "".concat(id, "_tooltip");
    useEffect(function () {
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
    useEffect(function () {
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
    return (React.createElement(React.Fragment, null,
        React.cloneElement(children, {
            ref: setReferenceElement,
            'aria-describedby': open ? tooltipId : undefined
        }),
        container
            ? ReactDOM.createPortal(open && (React.createElement("div", __assign({ id: tooltipId, role: "tooltip", ref: setPopperElement, className: styles.tooltip, style: popperStyles.popper }, attributes.popper),
                text,
                React.createElement("span", { ref: setArrowElement, className: styles.tooltipArrow, style: popperStyles.arrow }))), container)
            : container));
}
//# sourceMappingURL=index.js.map