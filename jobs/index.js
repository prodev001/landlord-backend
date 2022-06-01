import cron from 'node-cron';
import EventEmitter from 'events';
import landlord from './landlord_job';
import building from './building_job';
import application from './application_job';
import claim from './claim_job';
import sendMessage from './sqs'

const event = new EventEmitter();

const jobs = async () => {

    //Update 'event process' leads to SF every 20 minutes
    const task1 = cron.schedule('*/1 * * * * * ', async() =>
      { 
          await landlord.onboard();
          await building.onboard();
          await application.onboard();
          await claim.onboard();
          // await sendMessage();
        },
        {
          scheduled: true,
          timezone: 'America/New_York',
        });

      task1.stop();
    }

export default jobs;
