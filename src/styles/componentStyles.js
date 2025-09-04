import { pointsDisplayTextStyle } from './typography';
import { colors } from './colors';

export const pointsDisplayStyle = {
  background: colors.pointsDisplayBGColor,
  borderRadius: '8px',
  textAlign: 'center',
  color: colors.EcoDisplayTextColor,
  ...pointsDisplayTextStyle(),
};

export const cleanupEntriesPointsStyle = {
  background: colors.pointsDisplayBGColor,
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  color: colors.EcoDisplayTextColor,
  fontWeight: 'bold',
  marginLeft: '1rem',
};
