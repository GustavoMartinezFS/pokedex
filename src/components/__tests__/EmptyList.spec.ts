import { mount } from '@vue/test-utils';
import EmptyList from '@/components/molecules/EmptyList.vue';
import BtnAtom from '@/components/atoms/BtnAtom.vue';

describe('EmptyList.vue', () => {
  it('renders title and message correctly', () => {
    const wrapper = mount(EmptyList);
    expect(wrapper.text()).toContain('Uh-oh!');
    expect(wrapper.text()).toContain('You look lost on your journey!');
  });

  it('renders BtnAtom with correct props', () => {
    const wrapper = mount(EmptyList);
    const button = wrapper.findComponent(BtnAtom);

    expect(button.exists()).toBe(true);
    expect(button.props('name')).toBe('Go back home');
    expect(button.props('widthBt')).toBe('155');
    expect(button.props('active')).toBe(true);
  });

  it('emits "manage:goBack" event when BtnAtom is clicked', async () => {
    const wrapper = mount(EmptyList);

    const button = wrapper.findComponent(BtnAtom);
    await button.vm.$emit('manage:click');

    expect(wrapper.emitted('manage:goBack')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const wrapper = mount(EmptyList);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
