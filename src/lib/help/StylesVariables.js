import * as colors from './ColorsVariables';

// ROWS COLORS
export const invalidRow = {backgroundColor: colors.invalidRowGrey};
export const evenRow = {'&:nth-child(even)': {backgroundColor: colors.evenRowYellow}};
export const successRow = {backgroundColor: colors.successRowColor};
export const warningRow = {backgroundColor: colors.warningRowColor};
export const dangerRow = {backgroundColor: colors.dangerRowColor};

// ICONS COLORS
export const iconButton = {transition: 'color .3s', margin: '0 6px', minWidth: '16px', cursor: 'pointer', '&:hover': {color: colors.infoColor}};
export const successIcon = {color: colors.successColor, marginLeft: 'calc(50% - 7px)'};
export const warningIcon = {color: colors.warningColor, transition: 'color .3s', margin: '0 6px', minWidth: '16px', cursor: 'pointer', '&:hover': {color: colors.infoColor}};
export const dangerIcon = {color: colors.dangerColor};
export const exportIcon = {color: colors.exportColor, transition: 'color .3s', margin: '0 6px', minWidth: '16px', cursor: 'pointer', '&:hover': {color: colors.infoColor}};