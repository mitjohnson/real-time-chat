export type Toast = {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  timerId?: ReturnType<typeof setTimeout>;
  duration?: number;
  dismissing?: boolean;
};
