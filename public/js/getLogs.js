// create a single object from multiple objects
const getLogs = async () => {

    let result = await fetch('log/getAllLogsWithLanguages');
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

        let deleteButton = document.createElement('div');
        deleteButton.className = 'header-row delete-button';
        deleteButton.id = 'delete_' + result[i].id;
        deleteButton.innerHTML = '<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/><path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/></svg>'
        header.appendChild(deleteButton);
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

        // define function for delete button underneath the call to add the delete button to the DOM
        deleteButton.addEventListener('click', (e) => {
            let deletedCard = document.getElementById(deleteButton.id.replace('delete', 'card'));
            let r = confirm('Are you sure you want to delete this log?')
            if (r) {
                deletedCard.style.display = 'none';

                let request_body =  {
                    id : deletedCard.id.replace('card_', '')
                }

                fetch('/log/delete', {
                    method: 'post',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(request_body),
                })
            } else {
                return;
            }
            
        })
    }
    
}
getLogs();
