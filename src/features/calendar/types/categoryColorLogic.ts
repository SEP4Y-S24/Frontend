//logic for getting black or white text color based on background color
export interface RGB {
    r: number;
    g: number;
    b: number;
}

export function getTextColor(bgColor: string): string {
    const rgb: RGB = hexToRgb(bgColor);
    const luminance: number = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? 'black' : 'white';
}

export function hexToRgb(hex: string): RGB {
    const shorthandRegex: RegExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }; // Return black if hex is invalid
}
