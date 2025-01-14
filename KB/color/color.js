function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function rgbToBgr(rgb) {
    return rgb.substring(4, 6) + rgb.substring(2, 4) + rgb.substring(0, 2);
}
function rgbToDec(r, g, b) {
    const rgb = r | (g << 8) | (b << 16);
    return rgb.toString(10);
}
function hexToDec(hex, bgr = false) {
    hex = hex.replace(/^#/, "");
    const rgb = hexToRGB(hex);
    if (!bgr) {
        return rgbToDec(rgb[0], rgb[1], rgb[2]);
    }
    else {
        return rgbToDec(rgb[2], rgb[1], rgb[0]);
    }
}
function hexToRGB(hex) {
    hex = hex.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}
function convertRGB(r, g, b) {
    r = Number(r);
    g = Number(g);
    b = Number(b);
    r *= 255, g *= 255, b *= 255;
    return [Math.ceil(r), Math.ceil(g), Math.ceil(b)];
}

var exports = { rgbToHex, rgbToDec, hexToRGB, hexToDec, convertRGB, rgbToBgr };