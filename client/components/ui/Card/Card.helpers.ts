import { ThemedCardProps } from './Card.interface';


export const getCardColors = (
  variant: ThemedCardProps['variant'],
  backgroundColor: ThemedCardProps['backgroundColor'],
  borderColor: ThemedCardProps['borderColor']) => {

  switch (variant) {
    case 'elevated':
      return {
        backgroundColor: backgroundColor || 'card',
        borderColor: undefined,
        borderWidth: 0,
      };
    case 'outlined':
      return {
        backgroundColor: backgroundColor || 'card',
        borderColor: borderColor || 'border',
        borderWidth: 1,
      };
    case 'filled':
      return {
        backgroundColor: backgroundColor || 'surface',
        borderColor: undefined,
        borderWidth: 0,
      };
    default:
      return {
        backgroundColor: backgroundColor || 'card',
        borderColor: undefined,
        borderWidth: 0,
      };
  }
};
