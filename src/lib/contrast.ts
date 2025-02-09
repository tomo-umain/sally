export const calculateContrastRatio = (
  bgColor: string,
  textColor: string
): number => {
  // Helper function to parse CSS colors to RGB
  const parseColor = (color: string): number[] => {
    if (color.startsWith("rgb")) {
      return color.match(/\d+/g)!.map(Number);
    } else if (color.startsWith("#")) {
      if (color.length === 4) {
        return [
          parseInt(color[1] + color[1], 16),
          parseInt(color[2] + color[2], 16),
          parseInt(color[3] + color[3], 16),
        ];
      }
      return [
        parseInt(color.slice(1, 3), 16),
        parseInt(color.slice(3, 5), 16),
        parseInt(color.slice(5, 7), 16),
      ];
    }
    throw new Error("Unsupported color format");
  };

  // Helper function to calculate luminance
  const calculateLuminance = (r: number, g: number, b: number): number => {
    const [rr, gg, bb] = [r, g, b].map((c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
  };

  const bg = parseColor(bgColor);
  const text = parseColor(textColor);

  const bgLuminance = calculateLuminance(bg[0], bg[1], bg[2]);
  const textLuminance = calculateLuminance(text[0], text[1], text[2]);

  const lighter = Math.max(bgLuminance, textLuminance);
  const darker = Math.min(bgLuminance, textLuminance);

  return (lighter + 0.05) / (darker + 0.05);
};

export const convertToALevel = (ratio: number): string => {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "";
};
