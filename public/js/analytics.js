// get the dates for the request
let graphContainer = document.getElementById('graph-container');


let todayDate = new Date();
let lastWeekDate = new Date();
lastWeekDate.setDate(todayDate.getDate() - 7)
today = todayDate.toJSON() + 'T00:00:00.000Z'
lastWeek = lastWeekDate.toJSON().slice(0,10) + 'T00:00:00.000Z'

let datesThisWeek = [];
for (let i = 1; i <= 7; i++) {
    let iter = new Date();
    iter.setDate(lastWeekDate.getDate() + i)
    datesThisWeek.push(iter.toJSON().slice(0,10));
}
console.log(datesThisWeek)

// request the json
const getLastWeeksLog = async (datesThisWeek) => {
    let lastWeekAndToday = {
        today: today,
        lastWeek: lastWeek
    }
    lastWeekAndToday = JSON.stringify(lastWeekAndToday);

    let result = await fetch('/log/getLastWeek', {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: lastWeekAndToday
    })
    
    result = await result.json();

    // create an array of languages
    let languages = [];
    result.forEach((object) => {
        if (!languages.includes(object.language)) {
        languages.push(object.language)
        }
    })

    languages.forEach((language) => {

        let graphObj = {
            dates: datesThisWeek,
            cumulativeTimes: [0,0,0,0,0,0,0],
            individualTimes: [0,0,0,0,0,0,0],
        }
        
        result.forEach((object) => {
            if (object.language == language) {
                
                graphObj.individualTimes[datesThisWeek.indexOf(object.date)] = object.time/60;

                graphObj.title = object.language
            }
        })

        //create cumulativeTimes
        let sum = 0;
        for (let i = 0; i< graphObj.cumulativeTimes.length; i++) {
            sum+= graphObj.individualTimes[i];
            graphObj.cumulativeTimes[i] = sum;
        }

        graphObj.dates = graphObj.dates.map((date) => date.slice(5))

        createLanguageGraph(graphObj)

    })

}


const createLanguageGraph = (graphInfo) => {

    let { dates, cumulativeTimes, individualTimes, title } = graphInfo;

    // create a card
    let card = document.createElement('div');
    card.className = 'card'
    card.style.padding = '10px'
    card.style.margin = '10px 0px'
    
    // create a canvas
    let ctx = document.createElement('canvas')
    ctx.getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Hours per Day'ç,
                data: individualTimes,
                backgroundColor: '#443266',
                borderWidth: 1,
                lineTension: .5

            },
            {
                label: 'Total Cumulative Hours',
                data: cumulativeTimes,
                backgroundColor: 'rgb(141, 72, 159, 0.5)',
                borderWidth: 1,
                lineTension: .5

            }]
        },
        options: {
            title: {
                display: true,
                text: title,
                position: 'top',
                fontSize: 30,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        }
    })

    // append the context to the card
    card.appendChild(ctx)
    // append the card to the container
    graphContainer.appendChild(card);

}




getLastWeeksLog(datesThisWeek)







