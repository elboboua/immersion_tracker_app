// create a single object from multiple objects
const getLogs = async () => {

    let result = await fetch(`/user/${user.username}/getAllLogsWithLanguages`);
    result = await result.json();

    let logContainer = document.getElementById('log-container')
    
    for (let i = 0; i < result.length; i++) {
        let card = document.createElement('div');
        card.id = 'card_' + result[0].id
        card.className += " card log-card shadow";

        let header = document.createElement('div');
        header.className = 'card-header log-card-header';

        let title = document.createElement('div');
        title.className = 'header-row title'
        title.innerText = result[i].name;
        header.appendChild(title);
        card.appendChild(header);



        let body = document.createElement('div');
        body.className = 'card-body'

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

        body.appendChild(firstLine)
        body.appendChild(secondLine)
        card.appendChild(body);
        logContainer.appendChild(card)

    }
    
}
getLogs();

