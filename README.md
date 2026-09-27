# Discord Climb Countdown Bot

experimenting with Discord bot. This is some dumb shit that posts a monthly countdown message with an image for the much anticipated Aotearoa 2027.

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DISCORD_TOKEN=your_bot_token
CHANNEL_ID=your_channel_id
```

Run the bot:

```bash
npm start
```

~~The bot posts in the configured Discord channel on the 28th of each month.~~~~

> EDIT: using discord webhook now instead of bot so that we can use serverless or cron job without needing persistence websocket connection 