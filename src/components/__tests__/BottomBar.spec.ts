import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import BottomBar from '@/components/molecules/BottomBar.vue';
import BtnAtom from '@/components/atoms/BtnAtom.vue';
import { setActivePinia, createPinia } from 'pinia';
import { usePokemonStore } from '@/stores/pokemonStore';

describe('BottomBar.vue', () => {
  let store: ReturnType<typeof usePokemonStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = usePokemonStore();
  });

  it('renders two BtnAtom components', () => {
    const wrapper = mount(BottomBar);
    const buttons = wrapper.findAllComponents(BtnAtom);

    expect(buttons.length).toBe(2);
    expect(buttons[0].props('name')).toBe('All');
    expect(buttons[1].props('name')).toBe('Favorites');
  });

  it('sets the correct view when buttons are clicked', async () => {
    const wrapper = mount(BottomBar);

    const allButton = wrapper.findComponent(BtnAtom);
    await allButton.vm.$emit('manage:click');

    expect(store.currentView).toBe('all');

    const favoritesButton = wrapper.findAllComponents(BtnAtom)[1];
    await favoritesButton.vm.$emit('manage:click');

    expect(store.currentView).toBe('favorites');
  });

  it('updates button margins on window resize', async () => {
    const wrapper = mount(BottomBar);
    const initialMargin = wrapper.vm.buttonMargin;

    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.buttonMargin).not.toBe(initialMargin);
    expect(wrapper.vm.buttonMargin).toBe('0 20px');
  });

  it('removes resize event listener on component unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const wrapper = mount(BottomBar);

    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('matches snapshot', () => {
    const wrapper = mount(BottomBar);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
