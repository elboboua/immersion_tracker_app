
// request the json
const getLastYearsLog = async () => {
    // get the dates for the request
    
    let todayDate = new Date();
    let lastYearDate = new Date();
    lastYearDate.setMonth(todayDate.getMonth()-11);
    lastYearDate.setDate(1)
    today = todayDate.toJSON().slice(0,10) + 'T00:00:00.000Z'
    lastYear = lastYearDate.toJSON().slice(0,10) + 'T00:00:00.000Z'
    
    let monthsThisYear = [];
    for (let i = 0; i < 12; i++) {
        let iter = new Date();
        iter.setMonth(todayDate.getMonth() - i)
        monthsThisYear.unshift(iter.getMonth());
    }
    
    let lastYearAndToday = {
        today: today,
        lastYear: lastYear
    }
    lastYearAndToday = JSON.stringify(lastYearAndToday);
    
    let result = await fetch(`/user/${user.username}/getLastYear`, {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: lastYearAndToday
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
            dates: monthsThisYear,
            cumulativeTimes: new Array(12).fill(0),
            individualTimes: new Array(12).fill(0),
            title: language
        }
        
        result.forEach((object) => {
            if (object.language == language) {
                
                graphObj.individualTimes[monthsThisYear.indexOf(object.date-1)] = Math.round(object.time/60 * 100)/100;
                
            }
        })
        
        //create cumulativeTimes
        let sum = 0;
        for (let i = 0; i< graphObj.cumulativeTimes.length; i++) {
            sum+= graphObj.individualTimes[i];
            graphObj.cumulativeTimes[i] = sum;
        }
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        
        graphObj.dates = graphObj.dates.map((date) => {
            return months[date]
        })
        
        
        createLanguageGraph(graphObj, 'graph-container-year', 'Hours per Month')
        
    })
    
}





getLastYearsLog()







