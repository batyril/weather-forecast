import {GetCity} from "../js/now.js";

import {addCity} from "../js/sourse.js";
if(localStorage.getItem('lastCity')){
    GetCity(localStorage.getItem('lastCity'))
}


if(localStorage.getItem('favoriteCities')){
    let arrayLocal = JSON.parse(localStorage.getItem("favoriteCities"));

    arrayLocal.filter(function(item){
        addCity(item);
    });
}