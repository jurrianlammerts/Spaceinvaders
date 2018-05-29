import entries from 'object.entries';

if (!Object.entries)
    Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };

export default function applyStyles(styles: object, el: HTMLElement) {
    for (const [key, value] of Object.entries(styles)) {
        el.style[key] = value;
    }
} 