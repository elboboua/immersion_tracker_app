// get the dates for the request


// request the json
const getLastMonthsLog = async () => {
    let todayDate = new Date();
    let lastMonthDate = new Date();
    lastMonthDate.setDate(todayDate.getDate()-29);
    today = todayDate.toJSON().slice(0,10) + 'T00:00:00.000Z'
    lastMonth = lastMonthDate.toJSON().slice(0,10) + 'T00:00:00.000Z'
    
    let datesThisMonth = [];
    for (let i = 0; i < 30; i++) {
        let iter = new Date();
        iter.setDate(todayDate.getDate() - i)
        datesThisMonth.unshift(iter.toJSON().slice(0,10));
    }
    let lastMonthAndToday = {
        today: today,
        lastMonth: lastMonth
    }
    lastMonthAndToday = JSON.stringify(lastMonthAndToday);
    
    let result = await fetch(`/user/${user.username}/getLastMonth`, {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: lastMonthAndToday
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
            dates: datesThisMonth,
            cumulativeTimes: new Array(30).fill(0),
            individualTimes: new Array(30).fill(0),
        }
        
        result.forEach((object) => {
            if (object.language == language) {
                
                graphObj.individualTimes[datesThisMonth.indexOf(object.date.slice(0,10))] = Math.round(object.time/60 * 100)/100;
                
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
            let fdate = date.slice(5).replace('-', '/')
            if (fdate[0] == 0) {
                fdate = fdate.slice(1)
            }
            return fdate
        })
        
        
        createLanguageGraph(graphObj, 'graph-container-month', 'Hours per Day')
        
    })
    
}




getLastMonthsLog()







