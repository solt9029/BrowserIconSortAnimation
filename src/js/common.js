export function addCards(num) {
    for (let i = 0; i < num; i++) {
        $('body').append(`<div class="card" id="card${i}">${i}</div>`);
    }
}

export function getXNum(num, size, space) {
    let xNum = 1;
    if (Math.floor((window.innerWidth - space) / (space + size)) > 0) {
        xNum = Math.floor((window.innerWidth - space) / (space + size));
    }
    if (xNum > num) {
        xNum = num;
    }
    return xNum;
}