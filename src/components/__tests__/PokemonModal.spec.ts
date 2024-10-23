import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { vi } from 'vitest';
import PokemonModal from '@/components/organisms/PokemonModal.vue';
import FavAtom from '@/components/atoms/FavAtom.vue';
import { usePokemonStore } from '@/stores/pokemonStore';

const mockCapitalizeWords = vi.fn((str: string) =>
  str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
);

const mockCapitalize = vi.fn((str: string) => str.charAt(0).toUpperCase() + str.slice(1));


describe('PokemonModal.vue', () => {
  let pinia: ReturnType<typeof createPinia>;
  let mockStore: ReturnType<typeof usePokemonStore>;

  beforeEach(() => {
    vi.resetAllMocks();
    pinia = createPinia();
    setActivePinia(pinia);

    mockStore = {
      fetchPokemonDetails: vi.fn().mockResolvedValue({
        name: 'Pikachu',
        weight: 60,
        height: 4,
        types: ['Electric'],
        image: 'pikachu.png',
      }),
    } as unknown as ReturnType<typeof usePokemonStore>;
  });

  const createWrapper = (props = {}) => {
    return mount(PokemonModal, {
      global: {
        plugins: [pinia],
        mocks: {
          $capitalizeWords: mockCapitalizeWords,
          $capitalize: mockCapitalize,
        },
        provide: {
          store: mockStore,
        },
      },
      props,
    });
  };

  it('closes modal when close button is clicked', async () => {
    const wrapper = createWrapper({
      name: 'Pikachu',
      isFavorite: false,
    });

    await wrapper.find('.close-btn').trigger('click');
    expect(wrapper.emitted('close-modal')).toBeTruthy();
  });

  it('toggles favorite state when FavAtom component is clicked', async () => {
    const wrapper = createWrapper({
      name: 'Pikachu',
      isFavorite: false,
    });

    await wrapper.findComponent(FavAtom).vm.$emit('update:isFavorite', true);
    expect(wrapper.emitted('update:isFavorite')).toBeTruthy();
    expect(wrapper.emitted('update:isFavorite')![0]).toEqual([true]);
  });
});
