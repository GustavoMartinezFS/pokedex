import { mount } from '@vue/test-utils';
import Searchbar from '@/components/molecules/searchbar.vue';

describe('Searchbar.vue', () => {
  it('renders the search input with the correct placeholder', () => {
    const wrapper = mount(Searchbar, {
      props: { modelValue: '' },
    });
    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('Search');
  });

  it('renders the search icon correctly', () => {
    const wrapper = mount(Searchbar, {
      props: { modelValue: '' },
    });
    const icon = wrapper.find('i.icon-search img');
    expect(icon.exists()).toBe(true);
    expect(icon.attributes('src')).toBe('/src/assets/search.svg');
  });

  it('emits "update:modelValue" when input value changes', async () => {
    const wrapper = mount(Searchbar, {
      props: { modelValue: '' },
    });
    const input = wrapper.find('input');
    await input.setValue('test query');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test query']);
  });

  it('sets input value based on "modelValue" prop', async () => {
    const wrapper = mount(Searchbar, {
      props: { modelValue: 'initial query' },
    });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('initial query');
  });

  it('updates the input value when "modelValue" prop changes', async () => {
    const wrapper = mount(Searchbar, {
      props: { modelValue: 'initial query' },
    });
    await wrapper.setProps({ modelValue: 'updated query' });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('updated query');
  });
});
