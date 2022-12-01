/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { __assign } from "tslib";
import React, { useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Translate, { translate } from '@docusaurus/Translate';
import { useHistory, useLocation } from '@docusaurus/router';
import { usePluralForm } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import FavoriteIcon from '../../components/svgIcons/FavoriteIcon';
import { sortedUsers, Tags, TagList, } from '../../data/users';
import ShowcaseTagSelect, { readSearchTags, } from './_components/ShowcaseTagSelect';
import ShowcaseFilterToggle, { readOperator, } from './_components/ShowcaseFilterToggle';
import ShowcaseCard from './_components/ShowcaseCard';
import ShowcaseTooltip from './_components/ShowcaseTooltip';
import styles from './styles.module.css';
var TITLE = translate({ message: 'SignalWire Guide Showcase' });
var DESCRIPTION = translate({
    message: "This is SignalWire's list of guides for all products and all languages."
});
function restoreUserState(userState) {
    var _a;
    var _b = userState !== null && userState !== void 0 ? userState : {
        scrollTopPosition: 0,
        focusedElementId: undefined
    }, scrollTopPosition = _b.scrollTopPosition, focusedElementId = _b.focusedElementId;
    // @ts-expect-error: if focusedElementId is undefined it returns null
    (_a = document.getElementById(focusedElementId)) === null || _a === void 0 ? void 0 : _a.focus();
    window.scrollTo({ top: scrollTopPosition });
}
export function prepareUserState() {
    var _a;
    if (ExecutionEnvironment.canUseDOM) {
        return {
            scrollTopPosition: window.scrollY,
            focusedElementId: (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.id
        };
    }
    return undefined;
}
var SearchNameQueryKey = 'name';
function readSearchName(search) {
    return new URLSearchParams(search).get(SearchNameQueryKey);
}
function filterUsers(users, selectedTags, operator, searchName) {
    if (searchName) {
        // eslint-disable-next-line no-param-reassign
        users = users.filter(function (user) {
            return user.title.toLowerCase().includes(searchName.toLowerCase());
        });
    }
    if (selectedTags.length === 0) {
        return users;
    }
    return users.filter(function (user) {
        if (user.tags.length === 0) {
            return false;
        }
        if (operator === 'AND') {
            return selectedTags.every(function (tag) { return user.tags.includes(tag); });
        }
        return selectedTags.some(function (tag) { return user.tags.includes(tag); });
    });
}
function useFilteredUsers() {
    var location = useLocation();
    var _a = useState('OR'), operator = _a[0], setOperator = _a[1];
    // On SSR / first mount (hydration) no tag is selected
    var _b = useState([]), selectedTags = _b[0], setSelectedTags = _b[1];
    var _c = useState(null), searchName = _c[0], setSearchName = _c[1];
    // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
    // hydration mismatch)
    useEffect(function () {
        setSelectedTags(readSearchTags(location.search));
        setOperator(readOperator(location.search));
        setSearchName(readSearchName(location.search));
        restoreUserState(location.state);
    }, [location]);
    return useMemo(function () { return filterUsers(sortedUsers, selectedTags, operator, searchName); }, [selectedTags, operator, searchName]);
}
function ShowcaseHeader() {
    return (React.createElement("section", { className: "margin-top--lg margin-bottom--lg text--center" },
        React.createElement("h1", null, TITLE),
        React.createElement("p", null, DESCRIPTION)));
}
function useSiteCountPlural() {
    var selectMessage = usePluralForm().selectMessage;
    return function (sitesCount) {
        return selectMessage(sitesCount, translate({
            id: 'showcase.filters.resultCount',
            description: 'Pluralized label for the number of guides found on the showcase. Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
            message: '1 guide|{sitesCount} guides'
        }, { sitesCount: sitesCount }));
    };
}
function ShowcaseFilters() {
    var filteredUsers = useFilteredUsers();
    var siteCountPlural = useSiteCountPlural();
    return (React.createElement("section", { className: "container margin-top--l margin-bottom--lg" },
        React.createElement("div", { className: clsx('margin-bottom--sm', styles.filterCheckbox) },
            React.createElement("div", null,
                React.createElement("h2", null,
                    React.createElement(Translate, { id: "showcase.filters.title" }, "Filters")),
                React.createElement("span", null, siteCountPlural(filteredUsers.length))),
            React.createElement(ShowcaseFilterToggle, null)),
        React.createElement("ul", { className: clsx('clean-list', styles.checkboxList) }, TagList.map(function (tag, i) {
            var _a = Tags[tag], label = _a.label, description = _a.description, color = _a.color;
            var id = "showcase_checkbox_id_".concat(tag);
            return (React.createElement("li", { key: i, className: styles.checkboxListItem },
                React.createElement(ShowcaseTooltip, { id: id, text: description, anchorEl: "#__docusaurus" },
                    React.createElement(ShowcaseTagSelect, { tag: tag, id: id, label: label, icon: tag === 'favorite' ? (React.createElement(FavoriteIcon, { svgClass: styles.svgIconFavoriteXs })) : (React.createElement("span", { style: {
                                backgroundColor: color,
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                marginLeft: 8
                            } })) }))));
        }))));
}
var favoriteUsers = sortedUsers.filter(function (user) {
    return user.tags.includes('favorite');
});
var otherUsers = sortedUsers.filter(function (user) { return !user.tags.includes('favorite'); });
function SearchBar() {
    var history = useHistory();
    var location = useLocation();
    var _a = useState(null), value = _a[0], setValue = _a[1];
    useEffect(function () {
        setValue(readSearchName(location.search));
    }, [location]);
    return (React.createElement("div", { className: styles.searchContainer },
        React.createElement("input", { id: "searchbar", placeholder: translate({
                message: 'Search for a guide by name...',
                id: 'showcase.searchBar.placeholder'
            }), value: value !== null && value !== void 0 ? value : undefined, onInput: function (e) {
                setValue(e.currentTarget.value);
                var newSearch = new URLSearchParams(location.search);
                newSearch["delete"](SearchNameQueryKey);
                if (e.currentTarget.value) {
                    newSearch.set(SearchNameQueryKey, e.currentTarget.value);
                }
                history.push(__assign(__assign({}, location), { search: newSearch.toString(), state: prepareUserState() }));
                setTimeout(function () {
                    var _a;
                    (_a = document.getElementById('searchbar')) === null || _a === void 0 ? void 0 : _a.focus();
                }, 0);
            } })));
}
function ShowcaseCards() {
    var filteredUsers = useFilteredUsers();
    if (filteredUsers.length === 0) {
        return (React.createElement("section", { className: "margin-top--lg margin-bottom--xl" },
            React.createElement("div", { className: "container padding-vert--md text--center" },
                React.createElement("h2", null,
                    React.createElement(Translate, { id: "showcase.usersList.noResult" }, "No result")),
                React.createElement(SearchBar, null))));
    }
    return (React.createElement("section", { className: "margin-top--lg margin-bottom--xl" }, filteredUsers.length === sortedUsers.length ? (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.showcaseFavorite },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: clsx('margin-bottom--md', styles.showcaseFavoriteHeader) },
                    React.createElement("h2", null,
                        React.createElement(Translate, { id: "showcase.favoritesList.title" }, "Our favorites")),
                    React.createElement(FavoriteIcon, { svgClass: styles.svgIconFavorite }),
                    React.createElement(SearchBar, null)),
                React.createElement("ul", { className: clsx('container', 'clean-list', styles.showcaseList) }, favoriteUsers.map(function (user) { return (React.createElement(ShowcaseCard, { key: user.title, user: user })); })))),
        React.createElement("div", { className: "container margin-top--lg" },
            React.createElement("h2", { className: styles.showcaseHeader },
                React.createElement(Translate, { id: "showcase.usersList.allUsers" }, "All guides")),
            React.createElement("ul", { className: clsx('clean-list', styles.showcaseList) }, otherUsers.map(function (user) { return (React.createElement(ShowcaseCard, { key: user.title, user: user })); }))))) : (React.createElement("div", { className: "container" },
        React.createElement("div", { className: clsx('margin-bottom--md', styles.showcaseFavoriteHeader) },
            React.createElement(SearchBar, null)),
        React.createElement("ul", { className: clsx('clean-list', styles.showcaseList) }, filteredUsers.map(function (user) { return (React.createElement(ShowcaseCard, { key: user.title, user: user })); }))))));
}
export default function Showcase() {
    return (React.createElement(Layout, { title: TITLE, description: DESCRIPTION },
        React.createElement("main", { className: "margin-vert--lg" },
            React.createElement(ShowcaseHeader, null),
            React.createElement(ShowcaseFilters, null),
            React.createElement(ShowcaseCards, null))));
}
//# sourceMappingURL=index.js.map