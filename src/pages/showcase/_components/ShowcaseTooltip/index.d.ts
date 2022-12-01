/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
interface Props {
    anchorEl?: HTMLElement | string;
    id: string;
    text: string;
    children: React.ReactElement;
}
export default function Tooltip({ children, id, anchorEl, text, }: Props): JSX.Element;
export {};
