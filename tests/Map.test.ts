import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Map from '../components/Map.vue';

describe('Map component', async () => {
  test('renders properly', () => {
    const wrapper = mount(Map);

    // TODO: This test results completes successfully, but Vitest complains about the following:
    // TypeError: Unknown file extension ".png" for ...\kalapaikka\node_modules\leaflet\dist\images\marker-icon-2x.png
    // ❯ Object.getFileProtocolModuleFormat [as file:] node:internal/modules/esm/get_format:160:9
    // ❯ defaultGetFormat node:internal/modules/esm/get_format:203:36
    // ❯ defaultLoad node:internal/modules/esm/load:143:22
    // ❯ ModuleLoader.load node:internal/modules/esm/loader:409:7
    // ❯ ModuleLoader.moduleProvider node:internal/modules/esm/loader:291:45
    // ❯ link node:internal/modules/esm/module_job:76:21

    const map = wrapper.find('.leaflet-map');
    expect(map.exists()).toBe(true);
  });
});
