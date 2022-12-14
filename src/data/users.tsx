/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import {translate} from '@docusaurus/Translate';
import {sortBy} from '../utils/jsUtils';
import ArticleList from '@site/src/data/articles.json'

// LIST OF AVAILABLE TAGS
// Available tags to assign to a showcase guide
// Please choose all tags that you think might apply.
// We'll remove inappropriate tags, but it's less likely that we add tags.
export type TagType =
  | 'favorite'
  | 'lang:javascript'
  | 'lang:nodejs'
  | 'lang:csharp'
  | 'lang:go'
  | 'lang:php'
  | 'lang:react'
  | 'lang:ruby'
  | 'lang:python'
  | 'sdk:relayrealtime'
  | 'sdk:relay'
  | 'sdk:relaybrowser3'
  | 'sdk:relaybrowser2'
  | 'sdk:compatibility'
  | 'product:voice'
  | 'product:messaging'
  | 'product:chat'
  | 'product:video'
  | 'product:fax';


// Add sites to this list
// prettier-ignore
const Users: User[] = ArticleList;

export type User = {
  title: string;
  description: string;
  preview: string | null; // null = use our serverless screenshot service[]
  website: string;
  source: string | null;
  tags: TagType[];
};

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export const Tags: {[type in TagType]: Tag} = {
  "favorite": {
    label: translate({ message: 'Favorite' }),
    description: translate({
        message: '',
        id: 'showcase.tag.favorite.description'
    }),
    color: '#e9669e'
  },
  "lang\:javascript": {
    label: translate({message: 'JavaScript'}),
    description: translate({
      message: '',
      id: 'showcase.tag.lang:javascript.description',
    }),
    color: '#F0DB4F',
  },

  "lang\:nodejs": {
    label: translate({message: 'Node.js'}),
    description: translate({
      message: '',
      id: 'showcase.tag.lang:nodejs.description',
    }),
    color: '#89D42C',
  },

  "lang\:csharp": {
    label: translate({message: 'C#/.Net'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.lang:csharp.description',
    }),
    color: '#1384C8',
  },

  "lang\:go": {
    label: translate({message: 'Go'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.lang:go.description',
    }),
    color: '#6AD7E5',
  },

  "lang\:php": {
    label: translate({message: 'PHP'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.lang:php.description',
    }),
    color: '#6181B6',
  },

  "lang\:react": {
    label: translate({message: 'React'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.lang:react.description',
    }),
    color: '#53C1DE',
  },

  "lang\:ruby": {
    label: translate({message: 'Ruby'}),
    description: translate({
      message: '',
      id: 'showcase.tag.lang:ruby.description',
    }),
    color: '#D91505', // Facebook blue
  },

  "lang\:python": {
    label: translate({message: 'Python'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.lang:python.description',
    }),
    color: '#3372A7',
  },

  "sdk\:relayrealtime": {
    label: translate({message: 'Relay Realtime SDK (v3)'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.sdk:relayrealtime.description',
    }),
    color: '#044CF6',
  },

  "sdk\:relay": {
    label: translate({message: 'Relay SDK (v2)'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.sdk:relay.description',
    }),
    color: '#9BB7FB',
  },

  "sdk\:relaybrowser3": {
    label: translate({message: 'Relay Browser SDK (v3)'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.sdk:relaybrowser3.description',
    }),
    color: '#044CF6',
  },

  "sdk\:relaybrowser2": {
    label: translate({message: 'Relay Browser SDK (v2)'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.sdk:relaybrowser2.description',
    }),
    color: '#9BB7FB',
  },

  "sdk\:compatibility": {
    label: translate({message: 'Compatibility API'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.sdk:compatibility.description',
    }),
    color: '#F22F46',
  },

  "product\:voice": {
    label: translate({message: 'Voice'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.product:voice.description',
    }),
    color: '#9BB7FB',
  },

  "product\:messaging": {
    label: translate({message: 'Messaging'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.product:messaging.description',
    }),
    color: '#F22F46',
  },

  "product\:chat": {
    label: translate({message: 'Chat'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.product:chat.description',
    }),
    color: '#F0DB4F',
  },

  "product\:video": {
    label: translate({message: 'Video'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.product:video.description',
    }),
    color: '#044CF6',
  },

  "product\:fax": {
    label: translate({message: 'Fax'}),
    description: translate({
      message:
        '',
      id: 'showcase.tag.product:fax.description',
    }),
    color: '#F22F46',
  }
};

export const TagList = Object.keys(Tags) as TagType[];
function sortUsers() {
  let result = Users;
  // Sort by site name
  result = sortBy(result, (user) => user.title.toLowerCase());
  // Sort by favorite tag, favorites first
  result = sortBy(result, (user) => !user.tags.includes('favorite'));
  return result;
}

export const sortedUsers = sortUsers();
