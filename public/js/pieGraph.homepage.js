
const createPieChart = async () => {
    let pieContainer = document.getElementById('pie-graph-container');
    let pie = document.createElement('canvas')
    pie.style.height = '300px'
    pie.style.minHeight = '200px';
    pie.width = 'auto';
    pie.height = 'auto'
    pie.getContext('2d')

    let sumByType = await fetch('/homepage/sumByType');
    sumByType  = await sumByType.json();

    let typeNames = sumByType.map(element => element.name);
    let typeSums = sumByType.map(element => element.time)
    
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
                text: 'How People Study',
                position: 'top',
                fontSize: 30,
                fontColor: ['#443266']
            },
        },
    })
    
    pieContainer.appendChild(pie)

}

createPieChart();


