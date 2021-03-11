import { onMounted, ref, UnwrapRef } from '@vue/composition-api';

export default function useFetch<T>(initialValue: T, ...args: Parameters<typeof fetch>) {
  const data = ref(initialValue);

  onMounted(() => (async () => {
    const res = await fetch(...args);

    data.value = (await res.json()) as UnwrapRef<T>;
  })());

  return [
    data,
  ] as const;
}
