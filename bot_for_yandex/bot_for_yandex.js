// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

let keywords = ['Гобой', 'Как звучит флейта', 'Кларнет'];
let keyword = keywords[getRandom(0,keywords.length)];
//let btnk = document.querySelectorAll("button mini-suggest__button button_theme_websearch button_size_ws-head i-bem button_js_inited")[0];
let btnk = document.querySelectorAll('.button_theme_websearch')[0];

if (btnk != undefined){

    document.getElementById('text').value = keyword;
    btnk.click();
} else{
    let links = document.links;

    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            console.log("ссылка найдена"+links[i]);
            links[i].click();
           break;
        }
    }
}

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

