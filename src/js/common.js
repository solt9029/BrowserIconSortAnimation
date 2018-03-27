export function addCards() {
    for (let i = 0; i < query['num']; i++) {
        $('body').append(`<div class="card" id="card${i}">${i}</div>`);
    }
}

export function getXNum() {
    let xNum = 1;
    if (Math.floor((window.innerWidth - SPACE) / (SPACE + SIZE)) > 0) {
        xNum = Math.floor((window.innerWidth - SPACE) / (SPACE + SIZE));
    }
    if (xNum > query['num']) {
        xNum = query['num'];
    }
    return xNum;
}