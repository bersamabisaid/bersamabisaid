declare module 'v-money' {
  import type { PluginObject, VueConstructor } from 'vue';

  declare const plugin: PluginObject<unknown>;

  declare const Money: VueConstructor;

  export default plugin;

  export {
    Money,
  };
}
