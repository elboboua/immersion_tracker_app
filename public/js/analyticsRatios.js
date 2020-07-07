

// request the json
const getRatios = async () => {
    let result = await fetch('/log/getRatios')     
    result = await result.json();
    
    // create an array of languages
    let languages = [];
    result.forEach((object) => {
        if (!languages.includes(object.language)) {
            languages.push(object.language)
        }
    })
    
    languages.forEach((language) => {
        
        let typeNames = [];
        let typeSums = [];
        let title;

        result.forEach((object) => {
            if (object.language == language) {
                typeNames.push(object.type);
                typeSums.push(object.time)
                title = object.language;                
            }
        })
        
        
        let pieContainer = document.getElementById('graph-container-ratios');
        let card = document.createElement('div')
        card.className = 'card shadow';
        card.style.padding = '10px'
        card.style.margin = '10px 0px'
        card.style.width = 'fit-contents'

        let pie = document.createElement('canvas')
        pie.style.height = '300px'
        pie.style.minHeight = '200px';
        pie.width = '200px';
        pie.height = '300px'
        pie.getContext('2d')
        
        let myPieChart = new Chart(pie, {
            type: 'pie',
            data: {
                labels: typeNames,
                datasets: [{
                    data: typeSums,
                    backgroundColor: ['#443266', '#563f80','#7052a8', '#7a5eb0', '#bbadd7','#e7e1f0'],
                }],
            },
            options: {
                title: {
                    display: true,
                    text: title,
                    position: 'top',
                    fontSize: 30,
                    fontColor: ['#443266']
                },
            },
            responsive: true,
            maintainAspectRatio:false,
        })

        card.appendChild(pie)
        pieContainer.appendChild(card)
        
    })
    
}







getRatios()







