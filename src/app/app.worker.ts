/// <reference lib="webworker" />

import { WorkerMessage } from './types';

addEventListener('message', ({ data }: { data: WorkerMessage }) => {
  if (data.method === 'get') {
  }
  if (data.method === 'post') {
  }
});
