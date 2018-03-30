export function newTwoDimensionalArray(x, y) {
    return Array.from(new Array(y), () => new Array(x).fill(0));
}

export function getQuery() {
    if (window.location.search === "") {
        return;
    }
    const variables = window.location.search.split("?")[1].split("&");
    const obj = {};
    variables.forEach(function(v, i) {
        const variable = v.split("=");
        obj[variable[0]] = Number(variable[1]);
    });
    return obj;
}