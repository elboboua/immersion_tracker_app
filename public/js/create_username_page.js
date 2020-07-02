let usernameInput = document.getElementById('username-input');
let usernameMessage = document.getElementById('username-message');
let loader = document.getElementById('loader');
let submitButton = document.getElementById('submit-button');

submitButton.disabled = true;

usernameInput.oninput = async () => {
    submitButton.disabled = true;
    usernameMessage.style.display = 'none';
    usernameMessage.innerText = '';
    usernameMessage.className = '';

    let res = /^[a-zA-Z0-9]+$/.test(usernameInput.value)
    if (usernameInput.value.length == 0) {
        usernameMessage.style.display = 'none';
    } else if (res) {
        if (usernameInput.value.length > 4) {
            loader.style.display = 'block';
            let result = await fetch(`/account/try-username/$`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: usernameInput.value.toLowerCase()})
            });
            loader.style.display = 'none';
            usernameMessage.style.display = 'block';
            if (result.status == 200) {
                usernameMessage.className = 'alert-primary'
                usernameMessage.innerHTML = `<b>${usernameInput.value}</b> is available`;
                submitButton.disabled = false;
            } else if (result.status == 409) {
                usernameMessage.className = 'alert-danger'
                usernameMessage.innerHTML = `<b>${usernameInput.value}</b> is not available`;
                submitButton.disabled = true;
            }
        } else if (usernameInput.value.length > 0){
            usernameMessage.style.display = 'block';
            usernameMessage.className = 'alert-danger'
            usernameMessage.innerText = 'Username is too short';
        } 

    } else {
        usernameMessage.style.display = 'block';
            usernameMessage.className = 'alert-danger'
            usernameMessage.innerText = 'Username contains special characters';
    }

}

submitButton.onclick = async (e) => {
    e.preventDefault();
    await fetch(`/account/update-username/${usernameInput.value.toLowerCase()}`)
    location.href = '/'

}