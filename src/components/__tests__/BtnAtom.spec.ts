import { mount } from '@vue/test-utils';
import BtnAtom from '@/components/atoms/btnAtom.vue';

describe('BtnAtom.vue', () => {
  it('renders the button with the correct text', () => {
    const wrapper = mount(BtnAtom, {
      props: { name: 'Click me' },
    });
    expect(wrapper.text()).toContain('Click me');
  });

  it('disables the button when "disabled" prop is true', async () => {
    const wrapper = mount(BtnAtom, {
      props: { name: 'Click me', disabled: true },
    });
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
    expect(button.classes()).toContain('btn--disabled');
  });

  it('emits "manage:click" when clicked and not disabled', async () => {
    const wrapper = mount(BtnAtom, {
      props: { name: 'Click me', disabled: false },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('manage:click')).toBeTruthy();
  });

  it('does not emit "manage:click" when disabled', async () => {
    const wrapper = mount(BtnAtom, {
      props: { name: 'Click me', disabled: true },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('manage:click')).toBeFalsy();
  });

  it('applies the correct color class based on the "color" prop', async () => {
    const wrapper = mount(BtnAtom, {
      props: { name: 'Click me', color: 'red' },
    });
    expect(wrapper.classes()).toContain('btn--red');
  });

  it('applies pressed state when "pressed" is true and button is clicked', async () => {
    const wrapper = mount(BtnAtom, {
      props: { name: 'Click me', pressed: true },
    });
    const button = wrapper.find('button');
    await button.trigger('mousedown');
    expect(button.attributes('style')).toContain('background-color: rgb(192, 14, 32)');
  });

  it('renders icon when "icon" prop is provided', () => {
    const wrapper = mount(BtnAtom, {
      props: { name: 'Click me', icon: 'star' },
    });
    expect(wrapper.find('img').exists()).toBe(true);
  });

  it('does not render icon if "icon" prop is null', () => {
    const wrapper = mount(BtnAtom, {
      props: { name: 'Click me', icon: null },
    });
    expect(wrapper.find('img').exists()).toBe(false);
  });
});
