/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { type ReactNode, type ComponentProps } from '@site/node_modules/react';
export type SvgIconProps = ComponentProps<'svg'> & {
    viewBox?: string;
    size?: 'inherit' | 'small' | 'medium' | 'large';
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'warning';
    svgClass?: string;
    colorAttr?: string;
    children: ReactNode;
};
export default function Svg(props: SvgIconProps): JSX.Element;
