import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.SQS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const sns = new AWS.SNS();

async function send_email_notification(subject, message, type = null) {
  var topic = process.env.SNS_ERROR_ARN;
  if (type === 'notify') {
    topic = process.env.SNS_NOTIFICATION_ARN;
  }
  var params = {
    Message: message,
    Subject: subject,
    TopicArn: topic,
  };
  sns.publish(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
}

export default {
  send_email_notification,
};
