import { mount } from '@vue/test-utils';
import FavAtom from '@/components/atoms/FavAtom.vue';

describe('FavAtom.vue', () => {
  it('renders the correct icon based on isFavorite prop', async () => {
    const wrapper = mount(FavAtom, {
      props: {
        isFavorite: true,
      },
    });

    const starGold = wrapper.find('img[alt="star-gold"]');
    expect(starGold.exists()).toBe(true);

    await wrapper.setProps({ isFavorite: false });

    const starGray = wrapper.find('img[alt="star"]');
    expect(starGray.exists()).toBe(true);
  });

  it('emits update:isFavorite event when clicked', async () => {
    const wrapper = mount(FavAtom, {
      props: {
        isFavorite: false,
      },
    });

    await wrapper.find('.fav-button').trigger('click');
    expect(wrapper.emitted('update:isFavorite')).toBeTruthy();
    expect(wrapper.emitted('update:isFavorite')?.[0]).toEqual([true]);

    await wrapper.setProps({ isFavorite: true });

    await wrapper.find('.fav-button').trigger('click');
    expect(wrapper.emitted('update:isFavorite')?.[1]).toEqual([false]);
  });

  it('updates local isFavorite state when prop changes', async () => {
    const wrapper = mount(FavAtom, {
      props: {
        isFavorite: false,
      },
    });

    expect(wrapper.vm.isFavorite).toBe(false);

    await wrapper.setProps({ isFavorite: true });

    expect(wrapper.vm.isFavorite).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = mount(FavAtom, {
      props: {
        isFavorite: true,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
