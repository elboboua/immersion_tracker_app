let loadInfo = async () => {
    let username = document.getElementById('username');
    let loggedHours = document.getElementById('logged-hours')
    let result = await fetch('/account/get-dashboard-info');
    result = await result.json()
    username.innerHTML = `@${result.username}`;
    loggedHours.innerHTML = Math.floor(result.loggedHours/60);
}
let loadAvatar = async () => {
    let imageName = await fetch('/account/avatar');
    imageName = await imageName.json();
    let avatar = document.getElementById('avatar');
    avatar.src = `/imgs/avatars/${imageName.avatar_name || 'default.png'}`;
}
let loadFollowers = async () => {
    let followerInfo = await fetch('/followers');
    followerInfo = await followerInfo.json();
    document.getElementById('following').innerText = followerInfo.following;
    document.getElementById('followers').innerText = followerInfo.followers;
}

let loadDashboard = async () => {
    loadAvatar();
    loadInfo();
    loadFollowers();
}

loadDashboard()