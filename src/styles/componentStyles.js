import { pointsDisplayTextStyle } from './typography';
import { colors } from './colors';

export const pointsDisplayStyle = {
  background: colors.PointsDisplayBGColor,
  borderRadius: '8px',
  textAlign: 'center',
  color: colors.EcoDisplayTextColor,
  ...pointsDisplayTextStyle(),
};
