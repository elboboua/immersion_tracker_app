let loader = document.getElementById('loader');
let alreadyLoading = false;

let discoverLogContainer = document.getElementById('discover-log-container');
let followingLogContainer = document.getElementById('following-log-container');
let discoverButton = document.getElementById('discover-button');
let followingButton = document.getElementById('following-button');

discoverLogContainer.style.display = 'block';
followingLogContainer.style.display = 'none';

discoverButton.onclick = () => {
    followingLogContainer.style.display = 'none';
    discoverLogContainer.style.display = 'block';
}
followingButton.onclick = () => {
    discoverLogContainer.style.display = 'none';
    followingLogContainer.style.display = 'block';
}


const createAndAppendCards = (result, container, cardClass) => {
    let logContainer = document.getElementById(container)
    
    for (let i = 0; i < result.length; i++) {
        let card = document.createElement('div');
        card.className += " card log-card shadow " + cardClass;
        card.id = result[i].id

        let header = document.createElement('div');
        header.className = 'card-header log-card-header';

        let avatarContainer = document.createElement('div');
        avatarContainer.className = 'avatar-container header-components'
        let avatar = document.createElement('img');
        let avatar_src = result[i].avatar_name || 'default.png'
        avatar.src = `/imgs/avatars/${avatar_src}`;
        avatar.className = 'avatar';
        
        
        let user_link = document.createElement('a');
        user_link.href = `/user/${result[i].username}`
        user_link.className = 'user-link header-components'
        let username = document.createElement('div');
        username.className = 'header-row clickable'
        username.innerText = '@' + result[i].username;

        avatarContainer.appendChild(avatar);
        header.appendChild(avatarContainer);
        user_link.appendChild(username)
        header.appendChild(user_link);
        card.appendChild(header);


        let body = document.createElement('div');
        body.className = 'card-body'

        let activityLine = document.createElement('div');
        activityLine.className = 'card-line activity';
        activityLine.innerText = result[i].activity;


        let firstLine = document.createElement('div');
        firstLine.className = 'card-line';

        let language = document.createElement('span');
        language.innerText = result[i].language;
        firstLine.appendChild(language);

        let type = document.createElement('span');
        type.className = 'right-info'
        type.innerText = result[i].type;
        firstLine.appendChild(type);


        let secondLine = document.createElement('div');
        secondLine.className = 'card-line';

        let time = document.createElement('span');
        time.innerText = result[i].time + ' minutes';
        secondLine.appendChild(time);

        let date = document.createElement('span');
        date.className = 'right-info';
        // let date_var = new Date(result[i].date);
        // date.innerText = date_var.toLocaleDateString();
        date.innerText = result[i].date
        secondLine.appendChild(date);

        body.appendChild(activityLine)
        body.appendChild(firstLine)
        body.appendChild(secondLine)
        card.appendChild(body);
        logContainer.appendChild(card)

        if (i% 10 == 0 && i > 0) {
            let ad = document.createElement('div');
            ad.innerHTML = '<div class="_fa7cdd4c68507744" data-zone="1d60872081af4e1095e5fa33ffdee7f1" style="width:320px;height:100px;display: inline-block;margin: 0 auto"></div>'
            ad.className = 'text-center'
            logContainer.appendChild(ad)
        }
    }
}


const loadMoreLogs = async () => {
    
    if (!alreadyLoading) {
        if (discoverLogContainer.style.display == 'block') {
            alreadyLoading = true;
            let discoverCards = document.getElementsByClassName('discover-card')
            let result = await fetch(`/log/get-more-community-logs/${discoverCards[discoverCards.length-1].id}`)
            result = await result.json();
            createAndAppendCards(result, 'discover-log-container', 'discover-card');
            alreadyLoading = false;
        } else {
            alreadyLoading = true;
            let followingCards = document.getElementsByClassName('following-card')
            let result = await fetch(`/log/get-more-following-logs/${followingCards[followingCards.length-1].id}`)
            result = await result.json();
            createAndAppendCards(result, 'following-log-container', 'following-card');
            alreadyLoading = false; 
        }
    }
}


const addInfiniteScroll =  () => {


    if (screen.width > 640) {
        community_feed = document.getElementById('log-container');
        community_feed.onscroll = async () => {
            if (community_feed.scrollTop + community_feed.clientHeight >= community_feed.scrollHeight) {
                await loadMoreLogs();
            }
        }
    } else {
        document.body.onscroll = async () => {
            if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                await loadMoreLogs();
            }        
        }
    }


} 

// create a single object from multiple objects
const getCommunityLogs = async () => {

    let result = await fetch('/log/get-community-logs');
    result = await result.json();
    createAndAppendCards(result, 'discover-log-container', 'discover-card');
    
    
}

const getFollowingLogs = async () => {
    let result = await fetch('/log/get-following-logs');
    result = await result.json();
    createAndAppendCards(result, 'following-log-container', 'following-card')
}

getCommunityLogs();
getFollowingLogs();
addInfiniteScroll();

