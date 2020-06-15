let weekButton = document.getElementById('week-button');
let monthButton = document.getElementById('month-button');
let yearButton = document.getElementById('year-button');

let weekDiv = document.getElementById('graph-container-week');
let monthDiv = document.getElementById('graph-container-month');
let yearDiv = document.getElementById('graph-container-year');

weekDiv.style.display = 'block';
monthDiv.style.display = 'none';
yearDiv.style.display = 'none';

weekButton.addEventListener('click', (e) => {
    weekDiv.style.display = 'block';
    monthDiv.style.display = 'none';
    yearDiv.style.display = 'none';
})

monthButton.addEventListener('click', (e) => {
    weekDiv.style.display = 'none';
    monthDiv.style.display = 'block';
    yearDiv.style.display = 'none';
})

yearButton.addEventListener('click', (e) => {
    weekDiv.style.display = 'none';
    monthDiv.style.display = 'none';
    yearDiv.style.display = 'block';
})