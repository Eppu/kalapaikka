import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Map from '../components/Map.vue';

describe('Map component', async () => {
  test('renders properly', () => {
    const wrapper = mount(Map);
    console.log('wrapper', wrapper);
    expect(wrapper.text()).toContain('jee jee');
  });
});
