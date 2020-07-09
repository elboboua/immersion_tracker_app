let loadInfo = async () => {
    let username = document.getElementById('username');
    let loggedHours = document.getElementById('logged-hours')
    let result = await fetch(`/user/${user.username}/get-dashboard-info`);
    result = await result.json()
    username.innerHTML = `@${result.username}`;
    loggedHours.innerHTML = Math.floor(result.loggedHours/60);
}

let loadAvatar = async () => {
    let imageName = await fetch(`/user/${user.username}/avatar`);
    imageName = await imageName.json();
    let avatar = document.getElementById('avatar');
    avatar.src = `/imgs/avatars/${imageName.avatar_name || 'default.png'}`;
}

let loadFollowers = async () => {
    let followerInfo = await fetch(`/followers/${user.username}`);
    followerInfo = await followerInfo.json();
    document.getElementById('following').innerText = followerInfo.following;
    document.getElementById('followers').innerText = followerInfo.followers;

}

loadFollowButton = async () => {
    let followButton = document.getElementById('follow-button');
    let following = await fetch(`/followers/follows/${user.username}`)
    following = await following.json();
    following = following[0].count;
    let follows = false;
    if (following == 0) {
        followButton.innerText = 'Follow';
    } else {
        follows = true;
        followButton.innerText = 'Unfollow';
        followButton.style.backgroundColor = 'rgb(141, 72, 159, 0.5)'
        followButton.style.color = 'white'
    }

    followButton.onclick = () => {
        if (follows) {
            followButton.innerText = 'Follow';
            followButton.style.backgroundColor = 'white'
            followButton.style.color = '#212529'
            follows = false;
        } else {
            followButton.innerText = 'Unfollow';
            followButton.style.backgroundColor = 'rgb(141, 72, 159, 0.5)'
            followButton.style.color = 'white'
            follows = true;
        }

        fetch(`/followers/toggle-follow/${user.username}`)
        .then(() => {loadFollowers()})
    }
}


let loadDashboard = async () => {
    loadAvatar();
    loadInfo();
    loadFollowButton();
    loadFollowers();
}


loadDashboard()