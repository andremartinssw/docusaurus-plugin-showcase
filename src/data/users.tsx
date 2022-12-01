/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import {translate} from '@docusaurus/Translate';
import {sortBy} from '../utils/jsUtils';
import ArticleList from '/src/data/articles.json'

// LIST OF AVAILABLE TAGS
// Available tags to assign to a showcase guide
// Please choose all tags that you think might apply.
// We'll remove inappropriate tags, but it's less likely that we add tags.
export type TagType =
  | 'favorite'
  | 'javascript'
  | 'nodejs'
  | 'csharp'
  | 'go'
  | 'php'
  | 'react'
  | 'ruby'
  | 'python'
  | 'electron'
  | 'relayrealtime'
  | 'relay'
  | 'relaybrowser3'
  | 'relaybrowser2'
  | 'compatibility'
  | 'voice'
  | 'messaging'
  | 'chat'
  | 'video'
  | 'fax';


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
  favorite: {
    label: translate({message: 'Favorite'}),
    description: translate({
      message:
        'Our favorite Docusaurus sites that you must absolutely check out!',
      id: 'showcase.tag.favorite.description',
    }),
    color: '#e9669e',
  },

  javascript: {
    label: translate({message: 'JavaScript'}),
    description: translate({
      message: 'Open-Source Docusaurus sites can be useful for inspiration!',
      id: 'showcase.tag.javascript.description',
    }),
    color: '#F0DB4F',
  },

  nodejs: {
    label: translate({message: 'Node.js'}),
    description: translate({
      message: 'Docusaurus sites associated to a commercial nodejs!',
      id: 'showcase.tag.nodejs.description',
    }),
    color: '#89D42C',
  },

  csharp: {
    label: translate({message: 'C#/.Net'}),
    description: translate({
      message:
        'Beautiful Docusaurus sites, polished and standing out from the initial template!',
      id: 'showcase.tag.csharp.description',
    }),
    color: '#1384C8',
  },

  go: {
    label: translate({message: 'Go'}),
    description: translate({
      message:
        'Translated Docusaurus sites using the internationalization support with more than 1 locale.',
      id: 'showcase.tag.go.description',
    }),
    color: '#6AD7E5',
  },

  php: {
    label: translate({message: 'PHP'}),
    description: translate({
      message:
        'Docusaurus sites using the php feature of the docs plugin to manage multiple versions.',
      id: 'showcase.tag.php.description',
    }),
    color: '#6181B6',
  },

  react: {
    label: translate({message: 'React'}),
    description: translate({
      message:
        'Very react Docusaurus sites, including many more pages than the average!',
      id: 'showcase.tag.react.description',
    }),
    color: '#53C1DE',
  },

  ruby: {
    label: translate({message: 'Ruby'}),
    description: translate({
      message: 'Docusaurus sites of ruby (formerly Facebook) projects',
      id: 'showcase.tag.ruby.description',
    }),
    color: '#D91505', // Facebook blue
  },

  python: {
    label: translate({message: 'Python'}),
    description: translate({
      message:
        'python websites, blogs and digital gardens built with Docusaurus',
      id: 'showcase.tag.python.description',
    }),
    color: '#3372A7',
  },

  electron: {
    label: translate({message: 'Electron'}),
    description: translate({
      message:
        'Docusaurus sites using the right-to-left reading direction support.',
      id: 'showcase.tag.electron.description',
    }),
    color: '#75A3AB',
  },

  relayrealtime: {
    label: translate({message: 'Relay Realtime SDK (v3)'}),
    description: translate({
      message:
        'Docusaurus sites using the right-to-left reading direction support.',
      id: 'showcase.tag.relayrealtime.description',
    }),
    color: '#044CF6',
  },

  relay: {
    label: translate({message: 'Relay SDK (v2)'}),
    description: translate({
      message:
        'Docusaurus sites using the right-to-left reading direction support.',
      id: 'showcase.tag.relay.description',
    }),
    color: '#9BB7FB',
  },

  relaybrowser3: {
    label: translate({message: 'Relay Browser SDK (v3)'}),
    description: translate({
      message:
        'Docusaurus sites using the right-to-left reading direction support.',
      id: 'showcase.tag.relaybrowser3.description',
    }),
    color: '#044CF6',
  },

  relaybrowser2: {
    label: translate({message: 'Relay Browser SDK (v2)'}),
    description: translate({
      message:
        'Docusaurus sites using the right-to-left reading direction support.',
      id: 'showcase.tag.relaybrowser2.description',
    }),
    color: '#9BB7FB',
  },

  compatibility: {
    label: translate({message: 'Compatibility API'}),
    description: translate({
      message:
        'Docusaurus sites using the right-to-left reading direction support.',
      id: 'showcase.tag.compatibility.description',
    }),
    color: '#F22F46',
  },

  voice: {
    label: translate({message: 'Voice'}),
    description: translate({
      message:
        'Docusaurus sites using the right-to-left reading direction support.',
      id: 'showcase.tag.voice.description',
    }),
    color: '#9BB7FB',
  },

  messaging: {
    label: translate({message: 'Messaging'}),
    description: translate({
      message:
        'Docusaurus sites using the right-to-left reading direction support.',
      id: 'showcase.tag.messaging.description',
    }),
    color: '#F22F46',
  },

  chat: {
    label: translate({message: 'Chat'}),
    description: translate({
      message:
        'Docusaurus sites using the right-to-left reading direction support.',
      id: 'showcase.tag.chat.description',
    }),
    color: '#F0DB4F',
  },

  video: {
    label: translate({message: 'Video'}),
    description: translate({
      message:
        'Docusaurus sites using the right-to-left reading direction support.',
      id: 'showcase.tag.video.description',
    }),
    color: '#044CF6',
  },

  fax: {
    label: translate({message: 'Fax'}),
    description: translate({
      message:
        'Docusaurus sites using the right-to-left reading direction support.',
      id: 'showcase.tag.fax.description',
    }),
    color: '#F22F46',
  },
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
