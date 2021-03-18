import {
  onMounted, ref, Ref, UnwrapRef,
} from '@vue/composition-api';

type IuseFetch = <T> (
  initialValue: T,
  input: RequestInfo,
  init?: RequestInit | undefined,
) => Readonly<[
  Ref<UnwrapRef<T>>,
  Ref<boolean>,
  () => Promise<void>
]>;

const useFetch: IuseFetch = function (initialValue, input, init) {
  const data = ref(initialValue);
  const isLoading = ref(true);
  const fetcher = async function () {
    isLoading.value = true;
    const res = await fetch(input, init);

    isLoading.value = false;
    data.value = await res.json() as UnwrapRef<typeof initialValue>;
  };

  return [data, isLoading, fetcher];
};

const onMount: IuseFetch = function (initialValue, input, init) {
  const [data, isLoading, fetcher] = useFetch(initialValue, input, init);

  onMounted(() => fetcher());

  return [data, isLoading, fetcher];
};

export default Object.assign(useFetch, {
  onMount,
});
