# mysql statements for different data.

* selects time spent each month in one year for each language.
`select language_id, month(date), sum(time) from log where year(date) = 2020 group by month(date), language_id;`

* selects all time spent on each language organized by lang, month, and language
`select language_id, month(date), year(date), sum(time) from log group by month(date), year(date), language_id;`

* selects all of the weeks from the current month
`select language_id, week(date), sum(time) from log where month(date) = month(current_timestamp) group by week(date), language_id;`


# What graphs do we want?
* For each language with a log:
    * All time based on year
    * All year based on month
    * All month based on week
    * All week based on days

# How do we want to display it?
* Use a bootstrap style select that hides other elements when one is selected
    * This is called a button group

# What to store each graph in?
* Just push this in one by one into the container?
    * consider putting them into a card to clearly define borders between languages.


So we have the request sorted by language and date.
Now, how do we deconstruct this array of objects in a meaningful way.

```js
// create an array of languages
let languages = [];
result.forEach((object) => {
    if(!languages.includes(object.language) {
        language.push(object.language)
    }
})
// map the object
result.map((item) => )

```