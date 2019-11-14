
export function hash(str: string): string {
    for (var i = 0, h = 0; i < str.length; i++)
        h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    return String(h);
}