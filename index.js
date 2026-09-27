import dotenv from 'dotenv';
import { Client, GatewayIntentBits, WebhookClient, AttachmentBuilder } from 'discord.js';
import cron from 'node-cron';

dotenv.config();

/* OLD WEB CLIENT ARCHITECTURE
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});*/

// New webhook architecture
const webhook = new WebhookClient({
  url: process.env.WEBHOOK_URL,
});

const images = {
  1: "public/thumb-1920-645529.jpeg",
  2:"public/thumb-1920-645530.jpeg",
  3:"public/thumb-1920-1352186.png",
  4: "public/thumb-1920-1352188.png",
  5: "public/thumb-1920-1352189.png",
  6: "public/thumb-1920-1352190.png",
  7: "public/thumb-1920-1394172.png",
  8: "public/thumb-1920-1394173.png",
  9: "public/thumb-1920-1394174.png",
  10: "public/thumb-1920-1394198.png",
  11: "public/thumb-1920-1394199.png",
}


const CLIMB_YEAR = 2027;
const CLIMB_MONTH = 7;

function getMonthsUntilClimb() {
  const now = new Date();

  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Adelaide',
    year: 'numeric',
    month: 'numeric',
  }).formatToParts(now);

  const year = Number(parts.find((part) => part.type === 'year').value);
  const month = Number(parts.find((part) => part.type === 'month').value);

  return (CLIMB_YEAR - year) * 12 + (CLIMB_MONTH - month);
}

/* OLD WEB CLIENT ARCHITECTURE
cron.schedule('0 9 28 * *', async () => {
  const channel = await client.channels.fetch(process.env.CHANNEL_ID);
  const monthsUntilClimb = getMonthsUntilClimb();

  if(channel?.isTextBased()) {
      await channel.send({
        content: `${monthsUntilClimb} months until we climb`,
        files: [images[monthsUntilClimb] ? images[monthsUntilClimb + 1] : images[1]],
      });
    }
  },
  {
    timezone: 'Australia/Adelaide'
  }
);


client.login(process.env.DISCORD_TOKEN);
*/

// New webhook architecture, this doesn't actually use the bot anymore, just webhook into the channel
async function sendCountdown() {
  const monthsUntilClimb = getMonthsUntilClimb();

  const imagePath =
    images[monthsUntilClimb + 1] ?? images[1];

  const attachment = new AttachmentBuilder(imagePath);

  await webhook.send({
    content: `${monthsUntilClimb} months until we climb`,
    files: [attachment],
  });
}

sendCountdown();