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
var react_1 = __importDefault(require("react"));
var clsx_1 = __importDefault(require("clsx"));
var Link_1 = __importDefault(require("@docusaurus/Link"));
var Translate_1 = __importDefault(require("@docusaurus/Translate"));
var FavoriteIcon_1 = __importDefault(require("../../../../components/svgIcons/FavoriteIcon"));
var users_1 = require("../../../../data/users");
var jsUtils_1 = require("../../../../utils/jsUtils");
var ShowcaseTooltip_1 = __importDefault(require("../ShowcaseTooltip"));
var styles_module_css_1 = __importDefault(require("./styles.module.css"));
var TagComp = react_1["default"].forwardRef(function (_a, ref) {
    var label = _a.label, color = _a.color, description = _a.description;
    return (react_1["default"].createElement("li", { ref: ref, className: styles_module_css_1["default"].tag, title: description },
        react_1["default"].createElement("span", { className: styles_module_css_1["default"].textLabel }, label.toLowerCase()),
        react_1["default"].createElement("span", { className: styles_module_css_1["default"].colorLabel, style: { backgroundColor: color } })));
});
function ShowcaseCardTag(_a) {
    var tags = _a.tags;
    var tagObjects = tags.map(function (tag) { return (__assign({ tag: tag }, users_1.Tags[tag])); });
    // Keep same order for all tags
    var tagObjectsSorted = (0, jsUtils_1.sortBy)(tagObjects, function (tagObject) {
        return users_1.TagList.indexOf(tagObject.tag);
    });
    return (react_1["default"].createElement(react_1["default"].Fragment, null, tagObjectsSorted.map(function (tagObject, index) {
        var id = "showcase_card_tag_".concat(tagObject.tag);
        return (react_1["default"].createElement(ShowcaseTooltip_1["default"], { key: index, text: tagObject.description, anchorEl: "#__docusaurus", id: id },
            react_1["default"].createElement(TagComp, __assign({ key: index }, tagObject))));
    })));
}
function ShowcaseCard(_a) {
    var user = _a.user;
    return (react_1["default"].createElement("li", { key: user.title, className: "card shadow--md" },
        react_1["default"].createElement("div", { className: "card__body" },
            react_1["default"].createElement("div", { className: (0, clsx_1["default"])(styles_module_css_1["default"].showcaseCardHeader) },
                react_1["default"].createElement("h4", { className: styles_module_css_1["default"].showcaseCardTitle },
                    react_1["default"].createElement(Link_1["default"], { href: user.website, className: styles_module_css_1["default"].showcaseCardLink }, user.title)),
                user.tags.includes('favorite') && (react_1["default"].createElement(FavoriteIcon_1["default"], { svgClass: styles_module_css_1["default"].svgIconFavorite, size: "small" })),
                user.source && (react_1["default"].createElement(Link_1["default"], { href: user.source, className: (0, clsx_1["default"])('button button--secondary button--sm', styles_module_css_1["default"].showcaseCardSrcBtn) },
                    react_1["default"].createElement(Translate_1["default"], { id: "showcase.card.sourceLink" }, "source")))),
            react_1["default"].createElement("p", { className: styles_module_css_1["default"].showcaseCardBody }, user.description)),
        react_1["default"].createElement("ul", { className: (0, clsx_1["default"])('card__footer', styles_module_css_1["default"].cardFooter) },
            react_1["default"].createElement(ShowcaseCardTag, { tags: user.tags }))));
}
exports["default"] = react_1["default"].memo(ShowcaseCard);
