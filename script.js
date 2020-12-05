
const body = document.querySelector('.page');
import { productFetcher, faqs } from './util.js';
// productFetcher();
// faqs();


//listen to scroll...
const pages = document.querySelectorAll('.main');
const menuBut = document.querySelectorAll('.menu li')

//adding eventlistener for menu buttons
menuBut.forEach((button, index) => {
    button.addEventListener('click', BringtoView)
})

function BringtoView(e) {
    let i = (Array.from(menuBut).indexOf(event.target)) //get Index
    pages[i].scrollIntoView({ behavior: 'smooth', block: 'start' })
}

//call to action button
const callToAct = document.getElementById('callToAct')
callToAct.addEventListener('click', ()=>{
    pages[2].scrollIntoView({behavior: 'smooth', block:'start'});
})

function isVisible(element) {
    let elementBox = element.getBoundingClientRect();
    if (elementBox.top < window.innerHeight / 3) {
        return true;
    } else {
        return false;
    }
}

function scanDocument() {
    pages.forEach(function(page, index) {

        if (isVisible(page)) {
            //    console.log($(`.menu li:eq(${index})`))
            for (let i = 0; i < menuBut.length; i++) {
                i == index ? menuBut[i].classList.add('pageSelect') : menuBut[i].classList.remove('pageSelect');
            }
        }
    });
}


document.addEventListener("scroll", _.throttle(scanDocument, 800));


//PRELOADER

window.addEventListener('load', async () => {
    
    await productFetcher();
    await faqs()
    console.log("onload");
    $('.preloader').css('opacity', '0');
    body.style.display = 'block'
    
    setTimeout(() => {
    body.style.opacity = '1'

    }, 100);
})

/*
window.onload = async () => {
    let someData = await promiseOfSomeJsonData;
    console.log("onload");
};
*/