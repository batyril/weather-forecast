import {UI_ELEMENTS, UI_ELEMENTS_DETAIL} from "../js/view.js";
import {GetCity} from "../js/now.js";

let massage = undefined;
let arrayCity = [];

UI_ELEMENTS.FORM.addEventListener('submit', function(){
    event.preventDefault();
    massage = UI_ELEMENTS.FORM_TEXT.value;
    UI_ELEMENTS.FORM_TEXT.value =''
    GetCity(massage);
})

UI_ELEMENTS.FAVOURITES_CITY.addEventListener('click', () => {
    const addCityFavorite = UI_ELEMENTS.NOW_CITY.textContent;
    addCity(addCityFavorite);
}  )
export function addCity(City){
    if(arrayCity.includes(City)){
        return
    }
    else{
        arrayCity.push(City);
        localStorage.setItem('favoriteCities', JSON.stringify(arrayCity));
        let div = document.createElement('div');
        div.className = `${City}`;
        div.innerHTML =  `<span>${City}</span><img class="close_img" src="icon/close-icon.svg" alt="">`;
        UI_ELEMENTS.ADDED_LOCATIONS.prepend(div);

    }

};

UI_ELEMENTS.ADDED_LOCATIONS.addEventListener('click',deleteCity)
function deleteCity(){
    if(event.target.className === 'close_img'){
        arrayCity.filter(function (item, index){
            const ifCheckCity = (event.target.parentNode.textContent === item)
            if(ifCheckCity){
                arrayCity.splice(index,1);
                localStorage.setItem('favoriteCities', JSON.stringify(arrayCity));
            }
        });
        event.target.parentNode.remove();
    };
}

UI_ELEMENTS.ADDED_LOCATIONS.addEventListener('click', added_city_tab)
function added_city_tab(){
    if(event.target.nodeName === 'SPAN'){
        const spanCity = event.target.textContent;
        GetCity(spanCity);
    };
}


