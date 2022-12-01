/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { __spreadArray } from "tslib";
// Inspired by https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_sortby-and-_orderby
export function sortBy(array, getter) {
    var sortedArray = __spreadArray([], array, true);
    sortedArray.sort(function (a, b) {
        // eslint-disable-next-line no-nested-ternary
        return getter(a) > getter(b) ? 1 : getter(b) > getter(a) ? -1 : 0;
    });
    return sortedArray;
}
export function toggleListItem(list, item) {
    var itemIndex = list.indexOf(item);
    if (itemIndex === -1) {
        return list.concat(item);
    }
    var newList = __spreadArray([], list, true);
    newList.splice(itemIndex, 1);
    return newList;
}
//# sourceMappingURL=jsUtils.js.map