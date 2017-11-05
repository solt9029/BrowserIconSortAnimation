import "bootstrap/dist/css/bootstrap.min.css";
require("bootstrap");

import '../scss/common.scss';

$(() => {
    const query = getQuery();
    for (let i = 1; i <= query['num']; i++) {
        $('body').append(`<div class="card" id="card${i}">${i}</div>`);
    }
});

function getQuery() {
    if(window.location.search === "") return;
    const variables = window.location.search.split("?")[1].split("&");
    const obj = {};
    variables.forEach(function(v, i) {
        const variable = v.split("=");
        obj[variable[0]] = Number(variable[1]);
    });
    return obj;
}