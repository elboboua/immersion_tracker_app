const calculateStreak = async () => {
    let date_logs = await fetch(`/user/${user.username}/getLogsDate`);
    date_logs = await date_logs.json()

    let dates = date_logs.map(element => new Date(element.date));
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() -1)
    let streak = 0;
    
    dates.forEach(element => {


        if (today.toISOString().slice(0,10) == element.toISOString().slice(0,10)) {
            streak++;
        }

        if (yesterday.toISOString().slice(0,10) == element.toISOString().slice(0,10)) {
            streak++;
            yesterday.setDate(yesterday.getDate()-1);
        }
    });

    let streakTag = document.getElementById('streak');
    streakTag.innerText = streak;


}

calculateStreak()
