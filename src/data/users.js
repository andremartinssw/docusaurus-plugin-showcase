"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.sortedUsers = exports.TagList = exports.Tags = void 0;
/* eslint-disable global-require */
var Translate_1 = require("@docusaurus/Translate");
var jsUtils_1 = require("../utils/jsUtils");
var articles_json_1 = __importDefault(require("@site/src/data/articles.json"));
// Add sites to this list
// prettier-ignore
var Users = articles_json_1["default"];
exports.Tags = {
    "favorite": {
        label: (0, Translate_1.translate)({ message: 'Favorite' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.favorite.description'
        }),
        color: '#e9669e'
    },
    "lang\:javascript": {
        label: (0, Translate_1.translate)({ message: 'JavaScript' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.lang:javascript.description'
        }),
        color: '#F0DB4F'
    },
    "lang\:nodejs": {
        label: (0, Translate_1.translate)({ message: 'Node.js' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.lang:nodejs.description'
        }),
        color: '#89D42C'
    },
    "lang\:csharp": {
        label: (0, Translate_1.translate)({ message: 'C#/.Net' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.lang:csharp.description'
        }),
        color: '#1384C8'
    },
    "lang\:go": {
        label: (0, Translate_1.translate)({ message: 'Go' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.lang:go.description'
        }),
        color: '#6AD7E5'
    },
    "lang\:php": {
        label: (0, Translate_1.translate)({ message: 'PHP' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.lang:php.description'
        }),
        color: '#6181B6'
    },
    "lang\:react": {
        label: (0, Translate_1.translate)({ message: 'React' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.lang:react.description'
        }),
        color: '#53C1DE'
    },
    "lang\:ruby": {
        label: (0, Translate_1.translate)({ message: 'Ruby' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.lang:ruby.description'
        }),
        color: '#D91505'
    },
    "lang\:python": {
        label: (0, Translate_1.translate)({ message: 'Python' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.lang:python.description'
        }),
        color: '#3372A7'
    },
    "sdk\:relayrealtime": {
        label: (0, Translate_1.translate)({ message: 'Relay Realtime SDK (v3)' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.sdk:relayrealtime.description'
        }),
        color: '#044CF6'
    },
    "sdk\:relay": {
        label: (0, Translate_1.translate)({ message: 'Relay SDK (v2)' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.sdk:relay.description'
        }),
        color: '#9BB7FB'
    },
    "sdk\:relaybrowser3": {
        label: (0, Translate_1.translate)({ message: 'Relay Browser SDK (v3)' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.sdk:relaybrowser3.description'
        }),
        color: '#044CF6'
    },
    "sdk\:relaybrowser2": {
        label: (0, Translate_1.translate)({ message: 'Relay Browser SDK (v2)' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.sdk:relaybrowser2.description'
        }),
        color: '#9BB7FB'
    },
    "sdk\:compatibility": {
        label: (0, Translate_1.translate)({ message: 'Compatibility API' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.sdk:compatibility.description'
        }),
        color: '#F22F46'
    },
    "product\:voice": {
        label: (0, Translate_1.translate)({ message: 'Voice' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.product:voice.description'
        }),
        color: '#9BB7FB'
    },
    "product\:messaging": {
        label: (0, Translate_1.translate)({ message: 'Messaging' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.product:messaging.description'
        }),
        color: '#F22F46'
    },
    "product\:chat": {
        label: (0, Translate_1.translate)({ message: 'Chat' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.product:chat.description'
        }),
        color: '#F0DB4F'
    },
    "product\:video": {
        label: (0, Translate_1.translate)({ message: 'Video' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.product:video.description'
        }),
        color: '#044CF6'
    },
    "product\:fax": {
        label: (0, Translate_1.translate)({ message: 'Fax' }),
        description: (0, Translate_1.translate)({
            message: '',
            id: 'showcase.tag.product:fax.description'
        }),
        color: '#F22F46'
    }
};
exports.TagList = Object.keys(exports.Tags);
function sortUsers() {
    var result = Users;
    // Sort by site name
    result = (0, jsUtils_1.sortBy)(result, function (user) { return user.title.toLowerCase(); });
    // Sort by favorite tag, favorites first
    result = (0, jsUtils_1.sortBy)(result, function (user) { return !user.tags.includes('favorite'); });
    return result;
}
exports.sortedUsers = sortUsers();
