let dateInput = document.getElementById('dateInput');
let myDate = new Date();
dateInput.value = myDate.toLocaleDateString('en-CA');

const getLanguages = async () => {
    let languageSelector = document.getElementById('language');
    let result = await fetch('/language/get-saved-languages');
    result = await result.json()
    
    for (let i = 0; i < result.length; i++) {
        let option = document.createElement('option');
        option.value = result[i].id;
        option.text = result[i].name;
        languageSelector.appendChild(option)
    }

    let focusLang = await fetch('/account/get-focus-language');
    focusLang = await focusLang.json();
    languageSelector.value = focusLang[0].focus_language_id || 0;
}

const getTypes = async () => {
    let typeSelector = document.getElementById('type');
    let result = await fetch('/type');
    result = await result.json()
    
    for (let i = 0; i < result.length; i++) {
        let option = document.createElement('option');
        option.value = result[i].id;
        option.text = result[i].name;
        typeSelector.appendChild(option)
    }
}

getLanguages();
getTypes();