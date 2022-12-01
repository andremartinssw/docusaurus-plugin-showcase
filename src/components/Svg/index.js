/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { __assign, __rest } from "tslib";
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
export default function Svg(props) {
    var svgClass = props.svgClass, colorAttr = props.colorAttr, children = props.children, _a = props.color, color = _a === void 0 ? 'inherit' : _a, _b = props.size, size = _b === void 0 ? 'medium' : _b, _c = props.viewBox, viewBox = _c === void 0 ? '0 0 24 24' : _c, rest = __rest(props, ["svgClass", "colorAttr", "children", "color", "size", "viewBox"]);
    return (React.createElement("svg", __assign({ viewBox: viewBox, color: colorAttr, "aria-hidden": true, className: clsx(styles.svgIcon, styles[color], styles[size], svgClass) }, rest), children));
}
//# sourceMappingURL=index.js.map