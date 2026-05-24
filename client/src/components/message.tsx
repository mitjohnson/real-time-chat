import type { Message } from '../types'
import './message.scss'

function Message({ content, timestamp, sent }: Message) {
  return (  
    <div className={`message ${sent ? 'sent' : 'received'}`}>
      <p>{content}</p>
      <span>{timestamp.toLocaleTimeString()}</span>
    </div>
  );
};

export default Message
