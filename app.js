let krediHatasiz = true;
let taksitSayisihatasiz = true;
let faizHatasiz = true;

let krediHatasizAralik = true;
let taksitHatasizAralik = true;
let faizOranHatasiz =true;

// dom elementler

const krediTutari = document.getElementById('kredi-tutari');
const taksitSayisi = document.getElementById('taksit-sayisi');
const faizOrani = document.getElementById('faiz-orani');

const krediAralik = document.getElementById('kredi-aralik');
const taksitAralik = document.getElementById('taksit-aralik');

const krediHesapForm = document.querySelector("form");
const hesapSonuc = document.getElementById('hesapSonuc');


krediTutari.addEventListener('keyup', krediHataDenetle);
taksitSayisi.addEventListener('keyup', taksitHataDenetle);
faizOrani.addEventListener('keyup', faizHataDenetle);

krediTutari.addEventListener('change', (e) => {
    console.log('çalışıyor');
    hesapla(e) ;
});
krediAralik.addEventListener('change', (e) => {
    console.log('çalışıyor')
    hesapla(e) ;
});

taksitSayisi.addEventListener('change', (e) => {
    console.log('çalışıyor')
    hesapla(e) ;
});
taksitAralik.addEventListener('change', (e) => {
    console.log('çalışıyor')
    hesapla(e) ;
});

faizOrani.addEventListener('change', (e) => {
    console.log('çalışıyor')
    hesapla(e) ;
});

function krediHataDenetle(e) {
    console.log('ksamdla');
    const hataEl = document.querySelector('.kredi-hata');
    let krediTutarMiktari = parseFloat(krediTutari.value.trim());

    if(isNaN(krediTutarMiktari) ) {
        if(krediHatasiz) {
            krediHatasiz = false;
            hataYazdir('.kredi-hata' , 'p', 'Lütfen gerekli alanları doldurunuz ve sayı olarak giriniz.', 'danger');

        }
    } else if (krediTutarMiktari < 1000 || krediTutarMiktari > 100000) {
        if(krediHatasizAralik) {
            krediHatasizAralik = false;
            hataYazdir('.kredi-hata' , 'p', 'Lütfen 1.000 ile 100.000 arası sayı giriniz', 'danger');
        }
        return false;
    }

    else {
        while(hataEl.firstChild) {
            hataEl.firstChild.remove();
        }
        //inner html ile child elementleri silme
        // element.innerHTML = '';
        krediHatasizAralik = true;
        krediHatasiz = true;
        return true;
    }

    if(e) {
        e.preventDefault();
    }

}
function taksitHataDenetle(e) {
    const hataEl = document.querySelector('.taksit-hata');
    let taksitSayisiMiktar = parseFloat(taksitSayisi.value.trim());

    if(isNaN(taksitSayisiMiktar)) {
        if(taksitSayisihatasiz) {
            taksitSayisihatasiz = false;
            hataYazdir('.taksit-hata' , 'p', 'Lütfen taksit alanını doldurunuz ve sayı olarak giriniz.', 'danger');
        }
        return false;

    }else if (taksitSayisiMiktar < 3 || taksitSayisiMiktar > 36) {
        if(taksitHatasizAralik) {
            taksitHatasizAralik = false;
            hataYazdir('.taksit-hata' , 'p', 'Lütfen 3 ile 36 bir arası sayı giriniz', 'danger');
        }
        return false;
    }

    else {
        while(hataEl.firstChild) {
            hataEl.firstChild.remove();
        }
        taksitHatasizAralik = true;
        taksitSayisihatasiz = true;
        return true;
    }


}
function faizHataDenetle(e) {
    const hataEl = document.querySelector('.faiz-hata');
    let faizOraniMiktari = parseFloat(faizOrani.value.trim());

    if(isNaN(faizOraniMiktari)) {
        if(faizHatasiz) {
            faizHatasiz = false;
            hataYazdir('.faiz-hata' , 'p', 'Lütfen faiz alanını doldurunuz ve sayı olarak giriniz.', 'danger');
        }
        return false;

    }else if (faizOraniMiktari < 1 || faizOraniMiktari > 3) {
        if(faizOranHatasiz) {
            faizOranHatasiz = false;
            hataYazdir('.faiz-hata' , 'p', 'Lütfen 1 ile 3 bir arası sayı giriniz', 'danger');
        }
        return false;
    }

    else {
        while(hataEl.firstChild) {
            hataEl.firstChild.remove();
        }
        faizOranHatasiz = true;
        faizHatasiz = true;
        return true;
    }


}

krediHesapForm.addEventListener('submit', hesapla);

function hesapla(e){

    let krediTutarMiktari = parseFloat(krediTutari.value.trim());
    let taksitSayisiMiktari = parseFloat(taksitSayisi.value.trim());
    let faizOraniMiktari = parseFloat(faizOrani.value.trim());

    console.log(toString.call(krediTutarMiktari));


    if(krediHataDenetle() && faizHataDenetle() && taksitHataDenetle() ) {
        console.log('çalışıyoer');

        const taksitTutariEl = document.getElementById('taksitTutari');
        const toplamOdemeTutariEl = document.getElementById('toplamOdemeTutari');
        const faizOraniEl = document.getElementById('faizOrani');

        let toplamOdemeTutari = krediTutarMiktari * faizOraniMiktari * taksitSayisiMiktari;
        let taksitTutari = toplamOdemeTutari / taksitSayisiMiktari;

        taksitTutariEl.innerText = `${taksitTutari} TL`;
        toplamOdemeTutariEl.innerText = `${toplamOdemeTutari} TL`;
        faizOraniEl.innerText = `% ${faizOraniMiktari}`;


    }




    e.preventDefault();

}

krediAralik.addEventListener('change', (e)=>{
    inputGuncelle(krediTutari,krediAralik);
    e.preventDefault();
});

taksitAralik.addEventListener('change', (e)=>{
    inputGuncelle(taksitSayisi, taksitAralik);
    e.preventDefault();
});



function inputGuncelle(input, range) {
    input.value = range.value;
}


function Toaster(appendableParent, message, type, time) {
    const validTypes = ['success', 'info', 'warning', 'danger', 'primary', 'secondary', 'dark', 'light'];
    const parent = document.querySelector(appendableParent);
    const alertDiv = document.createElement('div');
    const alertMessageP = document.createElement('small');
    const dismissLink = document.createElement('button');

    if (!(validTypes.indexOf(type) > -1)) {
        throw new Error('Invalid Type');
    }


    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');

    alertMessageP.innerText = message;


    dismissLink.setAttribute('type', 'button');
    dismissLink.setAttribute('data-dismiss', 'alert');
    dismissLink.setAttribute('aria-label', 'close');
    dismissLink.setAttribute('title', 'close');
    dismissLink.className = 'close';
    dismissLink.innerHTML = `<span aria-hidden="true">&times;</span>`;
    alertDiv.appendChild(dismissLink);


    alertDiv.appendChild(alertMessageP);


    parent.appendChild(alertDiv);


    return new Promise((resolve, reject) => {
        setTimeout(function () {
            while (parent.firstChild) {
                parent.firstChild.remove();
            }
            resolve(true);
        }, time * 1000);
    })

}

function hataYazdir(parent, elementType, message, errorType) {
    const validTypes = ['success', 'info', 'warning', 'danger', 'primary', 'secondary', 'dark', 'light'];
    if (!(validTypes.indexOf(errorType) > -1)) {
        throw new Error('Invalid Type');
    }

    const parentEl = document.querySelector(parent);
    const el = document.createElement(elementType);
    const textNode = document.createTextNode(message);
    el.appendChild(textNode);
    el.className = `text-${errorType}`;
    parentEl.appendChild(el);
}

function elementSil(el) {
    el.remove();
}