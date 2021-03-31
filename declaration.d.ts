/* eslint-disable import/no-duplicates */

declare module 'v-money' {
  import type { PluginObject, VueConstructor } from 'vue';

  declare const plugin: PluginObject<unknown>;

  declare const Money: VueConstructor;

  export default plugin;
  export {
    Money,
  };
}

declare module 'vue-glide-js' {
  import type { VueConstructor } from 'vue';

  declare const Glide: VueConstructor;

  declare const GlideSlide: VueConstructor;

  export {
    Glide,
    GlideSlide,
  };
}
