// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import { ComponentOptions } from 'vue';

  const component: ComponentOptions;
  export default component;
}

declare module '*.png' {
  export default String;
}

declare module '*.jpg' {
  export default String;
}

declare module '*.svg' {
  export default String;
}
