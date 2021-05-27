import { ref } from 'vue';

interface useCountdownOptions {
  interval?: number;
}

const useCountdown = function ({
  interval = 1000,
}: useCountdownOptions = {}) {
  const count = ref(0);
  const reset = () => {
    count.value = 0;
  };
  const start = (stop: number) => new Promise<void>((resolve) => {
    count.value = stop / interval;

    const intervalId = setInterval(() => {
      if (count.value <= 0) {
        clearInterval(intervalId);
        resolve(undefined);
      }

      count.value -= 1;
    }, interval);
  });

  return [
    count,
    start,
    reset,
  ] as const;
};

export {
  useCountdown as default,
};
