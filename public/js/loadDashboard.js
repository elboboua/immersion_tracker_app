let loadDashboard = async () => {
    let username = document.getElementById('username');
    let loggedHours = document.getElementById('logged-hours')
    let result = await fetch('/account/get-dashboard-info');
    result = await result.json()
    username.innerHTML = `@${result.username}`;
    loggedHours.innerHTML = Math.floor(result.loggedHours/60);

    let imageName = await fetch('/account/avatar');
    imageName = await imageName.json();
    let avatar = document.getElementById('avatar');
    avatar.src = `/imgs/avatars/${imageName.avatar_name || 'default.png'}`;



}

loadDashboard()