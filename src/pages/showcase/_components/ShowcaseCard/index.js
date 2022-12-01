/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { __assign } from "tslib";
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
// import Image from '@theme/IdealImage';
import FavoriteIcon from '../../../../components/svgIcons/FavoriteIcon';
import { Tags, TagList, } from '../../../../data/users';
import { sortBy } from '../../../../utils/jsUtils';
import Tooltip from '../ShowcaseTooltip';
import styles from './styles.module.css';
var TagComp = React.forwardRef(function (_a, ref) {
    var label = _a.label, color = _a.color, description = _a.description;
    return (React.createElement("li", { ref: ref, className: styles.tag, title: description },
        React.createElement("span", { className: styles.textLabel }, label.toLowerCase()),
        React.createElement("span", { className: styles.colorLabel, style: { backgroundColor: color } })));
});
function ShowcaseCardTag(_a) {
    var tags = _a.tags;
    var tagObjects = tags.map(function (tag) { return (__assign({ tag: tag }, Tags[tag])); });
    // Keep same order for all tags
    var tagObjectsSorted = sortBy(tagObjects, function (tagObject) {
        return TagList.indexOf(tagObject.tag);
    });
    return (React.createElement(React.Fragment, null, tagObjectsSorted.map(function (tagObject, index) {
        var id = "showcase_card_tag_".concat(tagObject.tag);
        return (React.createElement(Tooltip, { key: index, text: tagObject.description, anchorEl: "#__docusaurus", id: id },
            React.createElement(TagComp, __assign({ key: index }, tagObject))));
    })));
}
// function getCardImage(user: User): string {
//   return (
//     user.preview ??
//     `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(
//       user.website,
//     )}/showcase`
//   );
// }
function ShowcaseCard(_a) {
    var user = _a.user;
    // const image = getCardImage(user);
    return (React.createElement("li", { key: user.title, className: "card shadow--md" },
        React.createElement("div", { className: "card__body" },
            React.createElement("div", { className: clsx(styles.showcaseCardHeader) },
                React.createElement("h4", { className: styles.showcaseCardTitle },
                    React.createElement(Link, { href: user.website, className: styles.showcaseCardLink }, user.title)),
                user.tags.includes('favorite') && (React.createElement(FavoriteIcon, { svgClass: styles.svgIconFavorite, size: "small" })),
                user.source && (React.createElement(Link, { href: user.source, className: clsx('button button--secondary button--sm', styles.showcaseCardSrcBtn) },
                    React.createElement(Translate, { id: "showcase.card.sourceLink" }, "source")))),
            React.createElement("p", { className: styles.showcaseCardBody }, user.description)),
        React.createElement("ul", { className: clsx('card__footer', styles.cardFooter) },
            React.createElement(ShowcaseCardTag, { tags: user.tags }))));
}
export default React.memo(ShowcaseCard);
//# sourceMappingURL=index.js.map