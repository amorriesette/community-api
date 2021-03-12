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
  console.log(actorMessage);

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
          "text": actorMessage
        }
      },
      {
        "type": "image",
        "title": {
          "type": "plain_text",
          "text": "image1",
          "emoji": true
        },
        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/onboardingComplex.jpg",
        "alt_text": "image1"
      }
    ]
  }

  return slackMessage;
}

