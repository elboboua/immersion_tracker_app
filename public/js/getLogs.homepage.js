    // create a single object from multiple objects
    const getLogs = async () => {

        let languageRes = await fetch('/language')
        languageRes = await languageRes.json();

        let languages = {}
        languageRes.forEach((element) => {
            languages[element.id] = element.name;
        })


        let logs = await fetch('/homepage/getAllLogs');
        logs = await logs.json();
        console.log(logs)

        let tableBody = document.getElementById('table-body')
        
        for (let i = 0; i < result.length; i++) {
            let row = document.createElement('tr');

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

            tableBody.appendChild(row)

            // define function for delete button underneath the call to add the delete button to the DOM
            
        }
        
    }
    getLogs();