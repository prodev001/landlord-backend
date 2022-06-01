import AWS from 'aws-sdk';
import { Consumer } from 'sqs-consumer';
import message_processor from '../processor/message_processor';

const queue_url = process.env.SQS_URL;
const bulk_landlord_queue_url = process.env.SQS_BULK_QUEUE;

AWS.config.update({
  region: process.env.SQS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const sqs = new AWS.SQS(); 

const worker = Consumer.create({
  queueUrl: queue_url,
  handleMessage: async (jobMessage) => {
    try {
      console.log('##### Start Processing ', jobMessage.MessageId);
      await message_processor.digestMessage(JSON.parse(jobMessage.Body));
    } catch (err) {
      console.log(err.message, 'failedasdfasdfadsf');
      throw new Error('Something failed');
    }
  },
  sqs: sqs,
});

worker.on('error', (err) => {
  console.error('SQS Error xxxxxx', err.message);
});

worker.on('processing_error', (err) => {
  console.error('SQS Processing Error', err.message);
});

const bulk_worker = Consumer.create({
  queueUrl: bulk_landlord_queue_url,
  handleMessage: async (jobMessage) => {
    try {
      console.log('##### Start Processing Bulk Landlord', jobMessage.MessageId);
      await message_processor.digestMessage(JSON.parse(jobMessage.Body));
    } catch (err) {
      console.log(err);
      throw new Error('Something failed');
    }
  },
  sqs: sqs,
});

bulk_worker.on('error', (err) => {
  console.error('SQS Error', err.message);
});

bulk_worker.on('processing_error', (err) => {
  console.error('SQS Processing Error', err.message);
});

const process_messages = () => {
  console.log('********** Starting message poll');
  worker.start();
  bulk_worker.start();
};

const push_message_to_queue = (message) => {
  console.log('********** Pushing message to Queue', message);
  const params = {
    MessageBody: JSON.stringify(message),
    QueueUrl: queue_url,
    MessageGroupId: message.id,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Successfully added message', data.MessageId);
    }
  });
};

const push_message_to_bulk_queue = (message) => {
  console.log('********** Pushing message to Bulk Queue', message);
  const params = {
    MessageBody: JSON.stringify(message),
    QueueUrl: bulk_landlord_queue_url,
    MessageGroupId: message.id,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Successfully added message', data.MessageId);
    }
  });
};

export default {
  process_messages,
  push_message_to_queue,
  push_message_to_bulk_queue,
};
