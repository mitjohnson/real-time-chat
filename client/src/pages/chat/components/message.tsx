import type { Message } from '@types/index'

import { useAuthStore } from '@store/auth.store'

function Message({ content, timestamp, sentBy }: Message) {
  const { user } = useAuthStore();
  const isUserMessage = sentBy === user?.id;

  const sentTime = timestamp ? new Date(timestamp).toLocaleString() : '';
  return (  
    <div>
      <p>{content}</p>
      <span>{sentTime}</span>
    </div>
  );
};

export default Message
