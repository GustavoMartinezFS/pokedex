import { mount } from '@vue/test-utils';
import ListPokemon from '@/components/molecules/ListPokemon.vue';
import FavAtom from '@/components/atoms/FavAtom.vue';
import { vi } from 'vitest';

const mockCapitalize = vi.fn((str: string) => str.charAt(0).toUpperCase() + str.slice(1));

describe('ListPokemon.vue', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const createWrapper = (props = {}) => {
    return mount(ListPokemon, {
      global: {
        mocks: {
          $capitalize: mockCapitalize,
        },
      },
      props,
    });
  };

  it('emits open:modal when list item is clicked', async () => {
    const wrapper = createWrapper({ pokemonName: 'pikachu', isFavorite: false });

    await wrapper.find('.list-item').trigger('click');
    expect(wrapper.emitted('open:modal')).toBeTruthy();
  });

  it('toggles favorite state when FavAtom is clicked', async () => {
    const wrapper = createWrapper({ pokemonName: 'pikachu', isFavorite: false });

    const favAtom = wrapper.findComponent(FavAtom);
    await favAtom.trigger('click');
    expect(wrapper.emitted('update:isFavorite')).toBeTruthy();
    expect(wrapper.emitted('update:isFavorite')![0]).toEqual([true]);
  });

  it('updates local isFavorite when prop changes', async () => {
    const wrapper = createWrapper({ pokemonName: 'pikachu', isFavorite: false });

    await wrapper.setProps({ isFavorite: true });
    expect(wrapper.vm.isFavorite).toBe(true);
  });

  it('does not emit update:isFavorite when favorite span is clicked', async () => {
    const wrapper = createWrapper({ pokemonName: 'pikachu', isFavorite: false });

    await wrapper.find('.fav-atom').trigger('click');
    expect(wrapper.emitted('update:isFavorite')).toBeFalsy();
  });
});
