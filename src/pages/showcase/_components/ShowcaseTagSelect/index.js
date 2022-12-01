/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { __assign, __rest } from "tslib";
import React, { useCallback, useState, useEffect, } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import { toggleListItem } from '../../../../utils/jsUtils';
import { prepareUserState } from '../../index';
import styles from './styles.module.css';
var TagQueryStringKey = 'tags';
export function readSearchTags(search) {
    return new URLSearchParams(search).getAll(TagQueryStringKey);
}
function replaceSearchTags(search, newTags) {
    var searchParams = new URLSearchParams(search);
    searchParams["delete"](TagQueryStringKey);
    newTags.forEach(function (tag) { return searchParams.append(TagQueryStringKey, tag); });
    return searchParams.toString();
}
function ShowcaseTagSelect(_a, ref) {
    var id = _a.id, icon = _a.icon, label = _a.label, tag = _a.tag, rest = __rest(_a, ["id", "icon", "label", "tag"]);
    var location = useLocation();
    var history = useHistory();
    var _b = useState(false), selected = _b[0], setSelected = _b[1];
    useEffect(function () {
        var tags = readSearchTags(location.search);
        setSelected(tags.includes(tag));
    }, [tag, location]);
    var toggleTag = useCallback(function () {
        var tags = readSearchTags(location.search);
        var newTags = toggleListItem(tags, tag);
        var newSearch = replaceSearchTags(location.search, newTags);
        history.push(__assign(__assign({}, location), { search: newSearch, state: prepareUserState() }));
    }, [tag, location, history]);
    return (React.createElement(React.Fragment, null,
        React.createElement("input", __assign({ type: "checkbox", id: id, className: "screen-reader-only", onKeyDown: function (e) {
                if (e.key === 'Enter') {
                    toggleTag();
                }
            }, onFocus: function (e) {
                var _a;
                if (e.relatedTarget) {
                    (_a = e.target.nextElementSibling) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new KeyboardEvent('focus'));
                }
            }, onBlur: function (e) {
                var _a;
                (_a = e.target.nextElementSibling) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new KeyboardEvent('blur'));
            }, onChange: toggleTag, checked: selected }, rest)),
        React.createElement("label", { ref: ref, htmlFor: id, className: styles.checkboxLabel },
            label,
            icon)));
}
export default React.forwardRef(ShowcaseTagSelect);
//# sourceMappingURL=index.js.map