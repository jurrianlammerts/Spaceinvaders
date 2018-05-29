"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!Object.entries)
    Object.entries = function (obj) {
        var ownProps = Object.keys(obj), i = ownProps.length, resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        return resArray;
    };
function applyStyles(styles, el) {
    for (const [key, value] of Object.entries(styles)) {
        el.style[key] = value;
    }
}
exports.default = applyStyles;
//# sourceMappingURL=applyStyles.js.map