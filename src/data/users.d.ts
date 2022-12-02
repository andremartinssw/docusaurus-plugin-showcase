/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export type TagType = 'favorite' | 'lang:javascript' | 'lang:nodejs' | 'lang:csharp' | 'lang:go' | 'lang:php' | 'lang:react' | 'lang:ruby' | 'lang:python' | 'sdk:relayrealtime' | 'sdk:relay' | 'sdk:relaybrowser3' | 'sdk:relaybrowser2' | 'sdk:compatibility' | 'product:voice' | 'product:messaging' | 'product:chat' | 'product:video' | 'product:fax';
export type User = {
    title: string;
    description: string;
    preview: string | null;
    website: string;
    source: string | null;
    tags: TagType[] | string[];
};
export type Tag = {
    label: string;
    description: string;
    color: string;
};
export declare const Tags: {
    [type in TagType]: Tag;
};
export declare const TagList: TagType[];
export declare const sortedUsers: User[];
