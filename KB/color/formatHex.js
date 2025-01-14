let { rgbToBgr } = require("./KB/color/color");
const COLOR_REGEX = /(\[#[0-9a-fA-F]{6}\])/g;
function formatHex(input) {
    const match = input.match(COLOR_REGEX);
    if (!match)
        return input;
    match.forEach((colorCode) => {
        let hexCol = colorCode.replace(/[\[#\]]/g, "").toUpperCase();
        hexCol = rgbToBgr(hexCol);
        input = input.replace(colorCode, `<color:${hexCol}>`);
    });
    return input;
}

var exports = formatHex;
