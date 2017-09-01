IOT Scheduler Beta - V0.0.1

- A scheduling MQTT API for Internet Of Things.
- Initially, it just sends the scheduled schedule object to mqtt client that will execute it.

## Pre-requirements:
- [MongoDB](https://www.mongodb.com/): 3.x or higher
- [NodeJS](https://www.nodejs.org/): 6.x or higher

## Getting Started

- Install modules

```sh
$ npm install
```

## Usage

- A schedule object is a MongoDB object. In this case, a schedule can assume any format and contain any properties, as it can be stored as a document.
- This schedules can be repetitive or not. In the first case, it must to specify the time and the day of the week, otherwise, just the datetime to execute it.

```json
//Example of MongoDB document
//every friday at 5:00 PM
{
    "day" : "friday",
    "time" : "17:00:00",
    "clientId" : "AAAA1234BBBB4321",
    "data" : {
        "deviceId" : 123,
        "content" : 25,
        "timestamp" : "some random date",
        "categoryId" : "car"
    }
}

//October 31th 2017 at 22:05:00
{
    "specificDatetime":"2017-10-31 22:05:00",
    "clientId" : "AAAA1234BBBB4321",
    "data" : {
        "label" : "Its halloween',
        "send" : "candies",
        "country" : "USA",
        "colors" : ["black","purple"]
    }
}

```

- The property "data" contains the object of schedule. It can store any data you want. Notice the API just send it, and the MQTT client should make something this data by owm.



## MQTT Client
- The MQTT doesn't need to create the schedule, but just work with the received scheduled data.
- The client must to specify its clientId, that must be the same of clientId schedule property. Also, must to subscribe in the topic /schedules/[CLIENTID].

```js
//Example
const mqtt = require('mqtt')
const clientId = 'AAAA1234BBBB4321'

const client  = mqtt.connect('mqtt://localhost:1883',{
    clientId: clientId.toString('hex')
})

client.on('connect', () => {
    client.subscribe(`/schedules/${clientId}`)
})

client.on('message', function (topic, message) {
    console.log('EXECUTE ACTION WITH THIS JSON:')
    console.log(message.toString())
})

```