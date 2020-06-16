const createLanguageGraph = (graphInfo, id, individualTimesString) => {
    
    let graphContainer = document.getElementById(id);
    let { dates, cumulativeTimes, individualTimes, title } = graphInfo;

    // create a card
    let card = document.createElement('div');
    card.className = 'card'
    card.style.padding = '10px'
    card.style.margin = '10px 0px'
    
    // create a canvas
    let ctx = document.createElement('canvas')
    ctx.style.height = '300px'
    ctx.style.minHeight = '200px';
    ctx.width = 'auto';
    ctx.height = 'auto'
    ctx.getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: individualTimesString,
                data: individualTimes,
                backgroundColor: '#443266',
                borderWidth: 1,
                lineTension: .5,
                pointRadius: 1,
                spanGaps: false,

            },
            {
                label: 'Cumulative Hours',
                data: cumulativeTimes,
                backgroundColor: 'rgb(141, 72, 159, 0.5)',
                borderWidth: 1,
                lineTension: .5,
                pointRadius: 1,

            }]
        },
        options: {
            title: {
                display: true,
                text: title,
                position: 'top',
                fontSize: 30,
                fontColor: '#443266'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio:false,
        }
    })

    // append the context to the card
    card.appendChild(ctx)
    // append the card to the container
    graphContainer.appendChild(card);

}