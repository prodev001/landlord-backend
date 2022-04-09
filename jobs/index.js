import cron from 'node-cron';
import EventEmitter from 'events';
import landlord from './landlord_job';
import building from './building_job';

const event = new EventEmitter();

const jobs = async () => {
    console.log('Registering Jobs');
  
    //Update 'event process' leads to SF every 20 minutes
    const task1 = cron.schedule('*/1 * * * * * ', async() =>
    {
        await landlord.onboard();
        await building.onboard();
        // await application.onboard();
      },
      {
        scheduled: true,
        timezone: 'America/New_York',
      }
    );
    task1.stop();
}

export default jobs;