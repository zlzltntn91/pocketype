import type { TypeId } from './types';

export const TYPE_BG: Record<TypeId, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

const LIGHT_BG_TYPES: TypeId[] = ['normal', 'electric', 'ice', 'fairy', 'ground', 'steel'];

export function typeFg(id: TypeId): string {
  return LIGHT_BG_TYPES.includes(id) ? '#111827' : '#FFFFFF';
}
