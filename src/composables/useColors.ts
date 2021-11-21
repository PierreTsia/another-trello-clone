import { ColorName, COLORS } from '/@/styles/colors.constant';

export interface ColorsComposition {
  colorName: typeof ColorName;
  colorValues: typeof COLORS;
}

export function useColors(): ColorsComposition {
  const colorName = ColorName;
  const colorValues = COLORS;

  return {
    colorName,
    colorValues,
  };
}
