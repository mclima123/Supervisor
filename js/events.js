let ACCESS_TOKEN = '1b18cmfeqDJ1EvAb8fGIhqLmbMFd8d'
let MADEIRA_PLACES_CODE = '2593105'



var Client = require('predicthq')

var phq = new Client({access_token: ACCESS_TOKEN})

phq.events.search({limit: 3, place: MADEIRA_PLACES_CODE, country:'PT', 'start.gte' : '2019-03-18'})
    .then(function(results){
        var events = results.toArray()
        for(var i=0; i < events.length; i++)
            console.info(events[i].rank, events[i].category, events[i].title, events[i].start, events[i].location )
    });

