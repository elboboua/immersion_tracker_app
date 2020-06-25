
// create a single object from multiple objects
const getLogs = async () => {

    let languageRes = await fetch('/language');
    languageRes = await languageRes.json();

    let languages = {}
    languageRes.forEach((element) => {
        languages[element.id] = element.name;
    })


    let result = await fetch(`/user/${user.username}/getAllLogs`);
    result = await result.json();

    let tableBody = document.getElementById('table-body')
    
    for (let i = 0; i < result.length; i++) {
        let row = document.createElement('tr');
        row.id = 'row_' + result[i].id

        let name = document.createElement('th');
        let name_text = document.createTextNode(result[i].name);
        name.appendChild(name_text);
        row.appendChild(name);

        let language = document.createElement('td');
        let language_text = document.createTextNode(languages[result[i].language_id]);
        language.appendChild(language_text);
        row.appendChild(language);

        let time = document.createElement('td');
        let time_text = document.createTextNode(result[i].time);
        time.appendChild(time_text);
        row.appendChild(time);

        let date = document.createElement('td');
        let date_var = new Date(result[i].date);
        let date_text = document.createTextNode(date_var.toLocaleDateString());
        date.appendChild(date_text);
        row.appendChild(date);

        let deleteButtonTD = document.createElement('td');
        let deleteButton = document.createElement('div')
        deleteButton.id = 'delete_' + result[i].id
        deleteButton.className = 'text-center'
        deleteButton.innerHTML = '<svg class="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg>'
        

        tableBody.appendChild(row)

    }
    
}
getLogs();
