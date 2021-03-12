const { response } = require('express')
const express = require('express')
const { message } = require('statuses')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/', (req, res) => {
  const messageBody = convertActivityToMessage(req.body);
  res.send(messageBody);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


function convertActivityToMessage(request){
  console.log(request);
  const item = request.fragments.activityInfo;
  const actorName = item.actor.fragments.activityActor.name;
  const actorMessage = item.body.fragments.activityBody.text;

  let slackMessage = {
    "blocks": [
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": actorName
          }
        ]
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": actorMessage.trim()
        }
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "View in Community",
              "emoji": true
            },
            "value": "view_in_community"
          }
        ]
      }
    ]
  }

  return slackMessage;
}

