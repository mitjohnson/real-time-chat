import type { Message } from '../types'
import styles from './message.module.scss'

function Message({ content, timestamp, sent }: Message) {
  return (  
    <div className={`${styles.message} ${sent ? styles.sent : styles.received}`}>
      <p>{content}</p>
      <span>{timestamp.toLocaleTimeString()}</span>
    </div>
  );
};

export default Message
