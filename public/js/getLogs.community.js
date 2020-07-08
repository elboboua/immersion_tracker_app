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

        let title = document.createElement('div');
        let avatar = document.createElement('img');
        let avatar_src = result[i].avatar_name || 'default.png'
        avatar.src = `/imgs/avatars/${avatar_src}`
        avatar.style.width = '25px';
        avatar.style.height = '25px';
        avatar.style.borderRadius = '50%';
        avatar.style.marginRight = '10px';
        let user_link = document.createElement('a');
        user_link.href = `/user/${result[i].username}`
        user_link.className = 'user-link'
        title.className = 'header-row title'
        title.innerText = '@' + result[i].username;
        header.appendChild(avatar);
        user_link.appendChild(title)
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
            ad.innerHTML = '<div class="_fa7cdd4c68507744" data-zone="33a0333f17384a5abdc089c0330591b2" style="width:468px;height:60px;display: inline-block;margin: 0 auto"></div>'
            ad.className = 'text-center'
            logContainer.appendChild(ad)
        }
    }
    
}
getCommunityLogs();
