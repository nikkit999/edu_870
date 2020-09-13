// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementById('text');
// let googleInput = document.getElementsByName('q')[0];
let keywords = ['Гобой','Как звучит флейта', 'Кларнет','Саксофон','Тромбон','Валторна'];
let keyword = keywords[getRandom(0,keywords.length)];
let btnK = document.querySelectorAll('.button_theme_websearch')[0];
let i = 0;
let links = document.links;

if (btnK != undefined){
    let timerId = setInterval(()=>{
        yandexInput.value += keyword[i];
        i++;
        if (i==keyword.length){
            clearInterval(timerId);
            btnK.click();
        }
    },1000);
}else if(location.hostname == "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai"){
    setInterval(()=>{
        let index = getRandom(0,links.length);
        if (getRandom(0,101)>=80){
            location.href = 'https://yandex.ru/';
        }
        else if (links[index].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1) {
            links[index].removeAttribute('target');
            links[index].click();}
    },getRandom(3000,7000));
}else{
    let nextYandexPage = true;
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            let link = links[i];
            link.removeAttribute('target');
            nextYandexPage = false;
            setTimeout(()=>{link.click();},getRandom(1000,4000));
            break;
        }
    }
    if (document.querySelectorAll('.pager__item_current_yes')[0].innerText==10){
        nextYandexPage = false;
        location.href = 'https://yandex.ru/';
    }

    if (nextYandexPage){
        let yanext = document.querySelectorAll('.pager__item_kind_next')[0];
        setTimeout(()=>{yanext.click();},getRandom(1000,4000));
    }
}

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
