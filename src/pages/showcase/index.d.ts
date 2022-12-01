/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="react" />
type UserState = {
    scrollTopPosition: number;
    focusedElementId: string | undefined;
};
export declare function prepareUserState(): UserState | undefined;
export default function Showcase(): JSX.Element;
export {};
