// create a single object from multiple objects
const getCommunityLogs = async () => {

    let result = await fetch('log/get-community-logs');
    result = await result.json();

    let logContainer = document.getElementById('log-container')
    
    for (let i = 0; i < result.length; i++) {
        let card = document.createElement('div');
        card.className += " card log-card shadow";

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
        username.className = 'header-row'
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
        let date_var = new Date(result[i].date);
        date.innerText = date_var.toLocaleDateString();
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
getCommunityLogs();
