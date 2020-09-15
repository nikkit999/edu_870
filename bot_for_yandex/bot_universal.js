// ==UserScript==
// @name         Bot universal
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":['Гобой','Как звучит флейта', 'Кларнет','Саксофон','Тромбон','Валторна'],
    "crushdrummers.ru":['Барабанное шоу','Заказать барабанное шоу','Шоу барабанщиков в Москве']
};
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];

let currentLocation = location.hostname;

let curLoc = false;
let universalInput = document.getElementsByName('q')[0];
let btnK = document.getElementsByName('btnK')[0];

if(location.hostname == "yandex.ru"){
    curLoc = true;
    universalInput = document.getElementById('text');
    btnK = document.querySelectorAll('.button_theme_websearch')[0];
}

let keywords = sites[site];
let keyword = keywords[getRandom(0,keywords.length)];

let i = 0;
let links = document.links;


if (btnK != undefined){
    document.cookie = "site="+site;
}else if (location.hostname == currentLocation){
    site = getCookie("site");
}else{
    site = location.hostname;
}

if (btnK != undefined){
    document.cookie = "site="+site;
    let timerId = setInterval(()=>{
        universalInput.value += keyword[i];
        i++;
        if (i==keyword.length){
            clearInterval(timerId);
            btnK.click();
        }
    },1000);
}else if(location.hostname == site){
    setInterval(()=>{
        let index = getRandom(0,links.length);
        if (getRandom(0,101)>=80){

            if(curLoc)location.href = 'https://yandex.ru/';
                location.href = 'https://www.google.com/';
        }
        else if (links[index].href.indexOf(site) != -1) {
            links[index].removeAttribute('target');
            links[index].click();}
    },getRandom(3000,7000));
}else{
    let nextUniversalPage = true;
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf(site) != -1){
            let link = links[i];
            link.removeAttribute('target');
            nextUniversalPage = false;
            setTimeout(()=>{link.click();},getRandom(1000,4000));
            break;
        }
    }

    if (document.querySelectorAll('.pager__item_current_yes')[0].innerText== "10" || document.querySelector('.YyVfkd').innerText=="10"){
        nextUniversalPage = false;
        if(curLoc)location.href = 'https://yandex.ru/';
                location.href = 'https://www.google.com/';
    }

    if (nextUniversalPage){
        let univNext = document.querySelectorAll('.pager__item_kind_next')[0];
        if (curLoc == false) univNext = pnnext;
        setTimeout(()=>{univNext.click();},getRandom(1000,4000));
    }

     if (getRandom(0,101)>=50)location.href = 'https://yandex.ru/';
            location.href = 'https://www.google.com/';

}



function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
