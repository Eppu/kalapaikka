import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Counter from '../components/Counter.vue';

describe('Counter component', async () => {
  test('renders properly', () => {
    const wrapper = mount(Counter);
    const counter = wrapper.find('.counter');

    expect(counter.exists()).toBe(true);
  });
});
