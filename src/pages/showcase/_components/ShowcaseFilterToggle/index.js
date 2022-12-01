/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { __assign } from "tslib";
import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { useHistory, useLocation } from '@docusaurus/router';
import { prepareUserState } from '../../index';
import styles from './styles.module.css';
export var OperatorQueryKey = 'operator';
export function readOperator(search) {
    var _a;
    return ((_a = new URLSearchParams(search).get(OperatorQueryKey)) !== null && _a !== void 0 ? _a : 'OR');
}
export default function ShowcaseFilterToggle() {
    var id = 'showcase_filter_toggle';
    var location = useLocation();
    var history = useHistory();
    var _a = useState(false), operator = _a[0], setOperator = _a[1];
    useEffect(function () {
        setOperator(readOperator(location.search) === 'AND');
    }, [location]);
    var toggleOperator = useCallback(function () {
        setOperator(function (o) { return !o; });
        var searchParams = new URLSearchParams(location.search);
        searchParams["delete"](OperatorQueryKey);
        if (!operator) {
            searchParams.append(OperatorQueryKey, 'AND');
        }
        history.push(__assign(__assign({}, location), { search: searchParams.toString(), state: prepareUserState() }));
    }, [operator, location, history]);
    return (React.createElement("div", null,
        React.createElement("input", { type: "checkbox", id: id, className: "screen-reader-only", "aria-label": "Toggle between or and and for the tags you selected", onChange: toggleOperator, onKeyDown: function (e) {
                if (e.key === 'Enter') {
                    toggleOperator();
                }
            }, checked: operator }),
        React.createElement("label", { htmlFor: id, className: clsx(styles.checkboxLabel, 'shadow--md') },
            React.createElement("span", { className: styles.checkboxLabelOr }, "OR"),
            React.createElement("span", { className: styles.checkboxLabelAnd }, "AND"))));
}
//# sourceMappingURL=index.js.map