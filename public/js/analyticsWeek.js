// get the dates for the request


// request the json
const getLastWeeksLog = async () => {
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
            cumulativeTimes: new Array(7).fill(0),
            individualTimes: new Array(7).fill(0),
        }
        
        result.forEach((object) => {
            if (object.language == language) {
                
                graphObj.individualTimes[datesThisWeek.indexOf(object.date)] = Math.round(object.time/60*100)/100;
                
                graphObj.title = object.language
            }
        })
        
        //create cumulativeTimes
        let sum = 0;
        for (let i = 0; i< graphObj.cumulativeTimes.length; i++) {
            sum+= graphObj.individualTimes[i];
            graphObj.cumulativeTimes[i] = sum;
        }
        
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        graphObj.dates = graphObj.dates.map((date) => {
            let day = new Date(date);
            date = day.getDay().toString();
            return days[date]
        })
        
        
        createLanguageGraph(graphObj, 'graph-container-week', 'Hours per Day')
        
    })
    
}







getLastWeeksLog()







