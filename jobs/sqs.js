import queue_listener from '../listener/queue_listener';


const sendMessage = () => {
    queue_listener.push_message_to_queue({
        type: 'test',
        params: {
          name: 'landlordportal'
        },
      });
}

export default sendMessage;