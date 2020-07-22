

// get the dates for the request


// request the json
const getLastWeeksLog = async () => {
    let datesThisWeek = [];
    for (let i = 0; i < 7; i++) {
        datesThisWeek.unshift(moment().subtract(i, 'days').format().slice(0,10));
    }
    let lastWeekAndToday = {
        today: moment().format(),
        lastWeek: moment().subtract(6, 'd').format()
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
            cumulativeTimes: new Array(7).fill(0),
            individualTimes: new Array(7).fill(0),
        }
        
        result.forEach((object) => {
            if (object.language == language) {
                
                graphObj.individualTimes[datesThisWeek.indexOf(object.date.slice(0,10))] = Math.round(object.time/60*100)/100;
                
                graphObj.title = object.language
            }
        })
        
        //create cumulativeTimes
        let sum = 0;
        for (let i = 0; i< graphObj.cumulativeTimes.length; i++) {
            sum+= graphObj.individualTimes[i];
            graphObj.cumulativeTimes[i] = sum;
        }
                
        graphObj.dates = graphObj.dates.map((date) => {
            date = moment(date).format('dddd')
            return date.slice(0,3)
        })
        
        
        createLanguageGraph(graphObj, 'graph-container-week', 'Hours per Day')
        
    })
    
}







getLastWeeksLog()







