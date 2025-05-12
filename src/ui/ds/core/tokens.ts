import { colors } from "./colors";
import { dimens } from "./dimens";
import { fontFamilies, fontSizes } from "./typography";

export type DsToken = {
    name: string;
    value: object
}

const colorsToken: DsToken = {
    name: 'color',
    value: colors
};

const fontSizesToken: DsToken = {
    name: 'fs',
    value: fontSizes
}


const fontFamiliesToken: DsToken = {
    name: 'ff',
    value: fontFamilies
}

const dimensToken: DsToken = {
    name: 'dimen',
    value: dimens
}

export const dsTokens: DsToken[] = [
    colorsToken,
    fontSizesToken,
    fontFamiliesToken,
    dimensToken,
]


