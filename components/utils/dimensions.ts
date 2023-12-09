import {Dimensions} from 'react-native';

const GUIDELINE_BASE_WIDTH = 375;
export const METERS_TO_MILES = 1609.344;

const {width, height} = Dimensions.get('window');
const [shortDimension] = width < height ? [width, height] : [height, width];

export const scale = (size: number) =>
  (shortDimension / GUIDELINE_BASE_WIDTH) * size;

export const dimensions = {
  header: {
    iconMarginHorizontal: scale(16),
    iconMarginTop: scale(12),
    dotMargins: scale(1),
  },
  font: {
    medium: scale(13),
    large: scale(17),
  },
  icon: {
    headerIconSize: scale(32),
    borderRadius: scale(6),
    iconSize: {
      smaller: scale(14),
      small: scale(18),
      smallest: scale(8),
      smallMedium: scale(16),
      medium: scale(22),
      mediumLarge: scale(32),
      large: scale(52),
    },
  },
  buttons: {
    smallSecondaryMargin: scale(5),
    height: {
      button: scale(54),
      uploadButton: scale(48),
      resetHeaderButton: scale(32),
    },
  },
  padding: {
    screenPadding: scale(16),
    cardPadding: scale(7),
    betweenCards: scale(12),
    betweenTwoButtons: scale(48),
    sectionPadding: scale(6),
    verticalNotificationBadge: scale(1),
    horizontalNotificationBadge: scale(4),
  },
  gap: {
    betweenElements: scale(20),
  },
  borderRadius: {
    smallBorderRadius: scale(6),
    mainBorderRadius: scale(12),
    image: scale(6),
  },
  borderWidth: {
    smallBorderWidth: scale(1),
    mainBorderWidth: scale(2),
  },
  image: {
    height: scale(329),
    heightSmall: scale(32),
    widthSmall: scale(32),
  },
};
