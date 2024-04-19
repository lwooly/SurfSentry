import cron from 'node-cron'
import { surfCheck } from './surfCheck.js';

cron.schedule("* * * * *", () => {
    console.log("A cron job that runs every minute");
    surfCheck()
  });