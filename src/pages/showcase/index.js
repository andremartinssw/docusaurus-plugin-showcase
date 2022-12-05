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
exports.prepareUserState = void 0;
var react_1 = __importStar(require("react"));
var clsx_1 = __importDefault(require("clsx"));
var ExecutionEnvironment_1 = __importDefault(require("@docusaurus/ExecutionEnvironment"));
var Translate_1 = __importStar(require("@docusaurus/Translate"));
var router_1 = require("@docusaurus/router");
var theme_common_1 = require("@docusaurus/theme-common");
var Layout_1 = __importDefault(require("@theme/Layout"));
var FavoriteIcon_1 = __importDefault(require("@site/src/components/svgIcons/FavoriteIcon"));
var users_1 = require("../../data/users");
var ShowcaseTagSelect_1 = __importStar(require("./_components/ShowcaseTagSelect"));
var ShowcaseFilterToggle_1 = __importStar(require("./_components/ShowcaseFilterToggle"));
var ShowcaseCard_1 = __importDefault(require("./_components/ShowcaseCard"));
var ShowcaseTooltip_1 = __importDefault(require("./_components/ShowcaseTooltip"));
var styles_module_css_1 = __importDefault(require("./styles.module.css"));
var TITLE = (0, Translate_1.translate)({ message: 'SignalWire Guide Showcase' });
var DESCRIPTION = (0, Translate_1.translate)({
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
function prepareUserState() {
    var _a;
    if (ExecutionEnvironment_1["default"].canUseDOM) {
        return {
            scrollTopPosition: window.scrollY,
            focusedElementId: (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.id
        };
    }
    return undefined;
}
exports.prepareUserState = prepareUserState;
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
    var location = (0, router_1.useLocation)();
    var _a = (0, react_1.useState)('OR'), operator = _a[0], setOperator = _a[1];
    // On SSR / first mount (hydration) no tag is selected
    var _b = (0, react_1.useState)([]), selectedTags = _b[0], setSelectedTags = _b[1];
    var _c = (0, react_1.useState)(null), searchName = _c[0], setSearchName = _c[1];
    // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
    // hydration mismatch)
    (0, react_1.useEffect)(function () {
        setSelectedTags((0, ShowcaseTagSelect_1.readSearchTags)(location.search));
        setOperator((0, ShowcaseFilterToggle_1.readOperator)(location.search));
        setSearchName(readSearchName(location.search));
        restoreUserState(location.state);
    }, [location]);
    return (0, react_1.useMemo)(function () { return filterUsers(users_1.sortedUsers, selectedTags, operator, searchName); }, [selectedTags, operator, searchName]);
}
function ShowcaseHeader() {
    return (react_1["default"].createElement("section", { className: "margin-top--lg margin-bottom--lg text--center" },
        react_1["default"].createElement("h1", null, TITLE),
        react_1["default"].createElement("p", null, DESCRIPTION)));
}
function useSiteCountPlural() {
    var selectMessage = (0, theme_common_1.usePluralForm)().selectMessage;
    return function (sitesCount) {
        return selectMessage(sitesCount, (0, Translate_1.translate)({
            id: 'showcase.filters.resultCount',
            description: 'Pluralized label for the number of sites found on the showcase. Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
            message: '1 guide|{sitesCount} guides'
        }, { sitesCount: sitesCount }));
    };
}
function ShowcaseFilters() {
    var filteredUsers = useFilteredUsers();
    var siteCountPlural = useSiteCountPlural();
    var FilteredTagList;
    return (react_1["default"].createElement("section", { className: "container margin-top--l margin-bottom--lg" },
        react_1["default"].createElement("div", { className: (0, clsx_1["default"])('margin-bottom--sm', styles_module_css_1["default"].filterCheckbox) },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("h2", null,
                    react_1["default"].createElement(Translate_1["default"], { id: "showcase.filters.title" }, "Filters")),
                react_1["default"].createElement("span", null, siteCountPlural(filteredUsers.length))),
            react_1["default"].createElement(ShowcaseFilterToggle_1["default"], null)),
        react_1["default"].createElement("h4", { style: { marginBottom: 'auto' } },
            react_1["default"].createElement(Translate_1["default"], { id: "showcase.filters.title" }, "Product")),
        react_1["default"].createElement("ul", { className: (0, clsx_1["default"])('clean-list', styles_module_css_1["default"].checkboxList) }, users_1.TagList.filter(function (tag) { return tag.includes('prod'); }).map(function (tag, i) {
            var _a = users_1.Tags[tag], label = _a.label, description = _a.description, color = _a.color;
            var id = "showcase_checkbox_id_".concat(tag);
            return (react_1["default"].createElement("li", { key: i, className: styles_module_css_1["default"].checkboxListItem },
                react_1["default"].createElement(ShowcaseTooltip_1["default"], { id: id, text: description, anchorEl: "#__docusaurus" },
                    react_1["default"].createElement(ShowcaseTagSelect_1["default"], { tag: tag, id: id, label: label, icon: tag === 'favorite' ? (react_1["default"].createElement(FavoriteIcon_1["default"], { svgClass: styles_module_css_1["default"].svgIconFavoriteXs })) : (react_1["default"].createElement("span", { style: {
                                backgroundColor: color,
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                marginLeft: 8
                            } })) }))));
        })),
        react_1["default"].createElement("h4", { style: { marginBottom: 'auto' } },
            react_1["default"].createElement(Translate_1["default"], { id: "showcase.filters.title" }, "SDK")),
        react_1["default"].createElement("ul", { className: (0, clsx_1["default"])('clean-list', styles_module_css_1["default"].checkboxList) }, users_1.TagList.filter(function (tag) { return tag.includes('sdk'); }).map(function (tag, i) {
            var _a = users_1.Tags[tag], label = _a.label, description = _a.description, color = _a.color;
            var id = "showcase_checkbox_id_".concat(tag);
            return (react_1["default"].createElement("li", { key: i, className: styles_module_css_1["default"].checkboxListItem },
                react_1["default"].createElement(ShowcaseTooltip_1["default"], { id: id, text: description, anchorEl: "#__docusaurus" },
                    react_1["default"].createElement(ShowcaseTagSelect_1["default"], { tag: tag, id: id, label: label, icon: tag === 'favorite' ? (react_1["default"].createElement(FavoriteIcon_1["default"], { svgClass: styles_module_css_1["default"].svgIconFavoriteXs })) : (react_1["default"].createElement("span", { style: {
                                backgroundColor: color,
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                marginLeft: 8
                            } })) }))));
        })),
        react_1["default"].createElement("h4", { style: { marginBottom: 'auto' } },
            react_1["default"].createElement(Translate_1["default"], { id: "showcase.filters.title" }, "Language")),
        react_1["default"].createElement("ul", { className: (0, clsx_1["default"])('clean-list', styles_module_css_1["default"].checkboxList) }, users_1.TagList.filter(function (tag) { return tag.includes('lang'); }).map(function (tag, i) {
            var _a = users_1.Tags[tag], label = _a.label, description = _a.description, color = _a.color;
            var id = "showcase_checkbox_id_".concat(tag);
            return (react_1["default"].createElement("li", { key: i, className: styles_module_css_1["default"].checkboxListItem },
                react_1["default"].createElement(ShowcaseTooltip_1["default"], { id: id, text: description, anchorEl: "#__docusaurus" },
                    react_1["default"].createElement(ShowcaseTagSelect_1["default"], { tag: tag, id: id, label: label, icon: tag === 'favorite' ? (react_1["default"].createElement(FavoriteIcon_1["default"], { svgClass: styles_module_css_1["default"].svgIconFavoriteXs })) : (react_1["default"].createElement("span", { style: {
                                backgroundColor: color,
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                marginLeft: 8
                            } })) }))));
        }))));
}
var favoriteUsers = users_1.sortedUsers.filter(function (user) {
    return user.tags.includes('favorite');
});
var otherUsers = users_1.sortedUsers.filter(function (user) { return !user.tags.includes('favorite'); });
function SearchBar() {
    var history = (0, router_1.useHistory)();
    var location = (0, router_1.useLocation)();
    var _a = (0, react_1.useState)(null), value = _a[0], setValue = _a[1];
    (0, react_1.useEffect)(function () {
        setValue(readSearchName(location.search));
    }, [location]);
    return (react_1["default"].createElement("div", { className: styles_module_css_1["default"].searchContainer },
        react_1["default"].createElement("input", { id: "searchbar", placeholder: (0, Translate_1.translate)({
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
        return (react_1["default"].createElement("section", { className: "margin-top--lg margin-bottom--xl" },
            react_1["default"].createElement("div", { className: "container padding-vert--md text--center" },
                react_1["default"].createElement("h2", null,
                    react_1["default"].createElement(Translate_1["default"], { id: "showcase.usersList.noResult" }, "No result")),
                react_1["default"].createElement(SearchBar, null))));
    }
    return (react_1["default"].createElement("section", { className: "margin-top--lg margin-bottom--xl" }, filteredUsers.length === users_1.sortedUsers.length ? (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: styles_module_css_1["default"].showcaseFavorite },
            react_1["default"].createElement("div", { className: "container" },
                react_1["default"].createElement("div", { className: (0, clsx_1["default"])('margin-bottom--md', styles_module_css_1["default"].showcaseFavoriteHeader) },
                    react_1["default"].createElement("h2", null,
                        react_1["default"].createElement(Translate_1["default"], { id: "showcase.favoritesList.title" }, "Our favorites")),
                    react_1["default"].createElement(FavoriteIcon_1["default"], { svgClass: styles_module_css_1["default"].svgIconFavorite }),
                    react_1["default"].createElement(SearchBar, null)),
                react_1["default"].createElement("ul", { className: (0, clsx_1["default"])('container', 'clean-list', styles_module_css_1["default"].showcaseList) }, favoriteUsers.map(function (user) { return (react_1["default"].createElement(ShowcaseCard_1["default"], { key: user.title, user: user })); })))),
        react_1["default"].createElement("div", { className: "container margin-top--lg" },
            react_1["default"].createElement("h2", { className: styles_module_css_1["default"].showcaseHeader },
                react_1["default"].createElement(Translate_1["default"], { id: "showcase.usersList.allUsers" }, "All guides")),
            react_1["default"].createElement("ul", { className: (0, clsx_1["default"])('clean-list', styles_module_css_1["default"].showcaseList) }, otherUsers.map(function (user) { return (react_1["default"].createElement(ShowcaseCard_1["default"], { key: user.title, user: user })); }))))) : (react_1["default"].createElement("div", { className: "container" },
        react_1["default"].createElement("div", { className: (0, clsx_1["default"])('margin-bottom--md', styles_module_css_1["default"].showcaseFavoriteHeader) },
            react_1["default"].createElement(SearchBar, null)),
        react_1["default"].createElement("ul", { className: (0, clsx_1["default"])('clean-list', styles_module_css_1["default"].showcaseList) }, filteredUsers.map(function (user) { return (react_1["default"].createElement(ShowcaseCard_1["default"], { key: user.title, user: user })); }))))));
}
function Showcase() {
    return (react_1["default"].createElement(Layout_1["default"], null,
        react_1["default"].createElement("main", { className: "margin-vert--lg" },
            react_1["default"].createElement(ShowcaseHeader, null),
            react_1["default"].createElement(ShowcaseFilters, null),
            react_1["default"].createElement(ShowcaseCards, null))));
}
exports["default"] = Showcase;
