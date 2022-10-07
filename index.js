require('dotenv').config();
const { App } = require('@slack/bolt');
const axios = require('axios');

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

(async () => {
  await app.start(process.env.PORT || 3000);

  app.message('*', async ({ message, say }) => {
    try {
      const res = await axios.post('https://api.sandbox.digitalhumani.com/tree', {
        "enterpriseId": "e80f8108",
        "projectId": "93333333",
        "user": "chris",
        "treeCount": 1
      }, {
        headers: {
          "X-Api-Key": process.env.DH_API_KEY,
          "Content-Type": "application/json"
        },
      });

      if (res.status === 200) {
        await say(`Thanks ${message.user}. ${res.data.treeCount} trees planted!`);
      }
    } catch(err) {
      await say(`Something went wrong: ${err.message}`);
    }
  });

  console.log('🌳 Go green app is running! 🌳');
})();
