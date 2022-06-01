

const digestMessage = async (message) => {
  try {
    console.log(message, 'sqs messaage digestMessage');
  } catch (error) {
    console.log(error);
    console.log('%$%$%$%$%', error.message);
    throw new Error(error.message);
  }
};

export default { digestMessage };
