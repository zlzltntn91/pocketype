export type TypeId =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy';

export interface TypeInfo {
  id: TypeId;
  nameKo: string;
  iconPath: string;
  offense: {
    superEffective: TypeId[];
    notVeryEffective: TypeId[];
    noEffect: TypeId[];
  };
  defense: {
    weakTo: TypeId[];
    resistTo: TypeId[];
    immuneTo: TypeId[];
  };
}

const RAW: Record<TypeId, { nameKo: string; offense: TypeInfo['offense']; defense: TypeInfo['defense'] }> = {
  normal: {
    nameKo: '노말',
    offense: { superEffective: [], notVeryEffective: ['rock', 'steel'], noEffect: ['ghost'] },
    defense: { weakTo: ['fighting'], resistTo: [], immuneTo: ['ghost'] },
  },
  fighting: {
    nameKo: '격투',
    offense: {
      superEffective: ['normal', 'rock', 'steel', 'ice', 'dark'],
      notVeryEffective: ['flying', 'poison', 'bug', 'psychic', 'fairy'],
      noEffect: ['ghost'],
    },
    defense: {
      weakTo: ['flying', 'psychic', 'fairy'],
      resistTo: ['rock', 'bug', 'dark'],
      immuneTo: [],
    },
  },
  flying: {
    nameKo: '비행',
    offense: {
      superEffective: ['fighting', 'bug', 'grass'],
      notVeryEffective: ['rock', 'steel', 'electric'],
      noEffect: [],
    },
    defense: {
      weakTo: ['rock', 'electric', 'ice'],
      resistTo: ['fighting', 'bug', 'grass'],
      immuneTo: ['ground'],
    },
  },
  poison: {
    nameKo: '독',
    offense: {
      superEffective: ['grass', 'fairy'],
      notVeryEffective: ['poison', 'ground', 'rock', 'ghost'],
      noEffect: ['steel'],
    },
    defense: {
      weakTo: ['ground', 'psychic'],
      resistTo: ['fighting', 'poison', 'bug', 'grass', 'fairy'],
      immuneTo: [],
    },
  },
  ground: {
    nameKo: '땅',
    offense: {
      superEffective: ['poison', 'rock', 'steel', 'fire', 'electric'],
      notVeryEffective: ['bug', 'grass'],
      noEffect: ['flying'],
    },
    defense: {
      weakTo: ['water', 'grass', 'ice'],
      resistTo: ['poison', 'rock'],
      immuneTo: ['electric'],
    },
  },
  rock: {
    nameKo: '바위',
    offense: {
      superEffective: ['flying', 'bug', 'fire', 'ice'],
      notVeryEffective: ['fighting', 'ground', 'steel'],
      noEffect: [],
    },
    defense: {
      weakTo: ['fighting', 'ground', 'steel', 'water', 'grass'],
      resistTo: ['normal', 'flying', 'poison', 'fire'],
      immuneTo: [],
    },
  },
  bug: {
    nameKo: '벌레',
    offense: {
      superEffective: ['grass', 'psychic', 'dark'],
      notVeryEffective: ['fighting', 'flying', 'poison', 'ghost', 'steel', 'fire', 'fairy'],
      noEffect: [],
    },
    defense: {
      weakTo: ['flying', 'rock', 'fire'],
      resistTo: ['fighting', 'ground', 'grass'],
      immuneTo: [],
    },
  },
  ghost: {
    nameKo: '고스트',
    offense: {
      superEffective: ['ghost', 'psychic'],
      notVeryEffective: ['dark'],
      noEffect: ['normal'],
    },
    defense: {
      weakTo: ['ghost', 'dark'],
      resistTo: ['poison', 'bug'],
      immuneTo: ['normal', 'fighting'],
    },
  },
  steel: {
    nameKo: '강철',
    offense: {
      superEffective: ['rock', 'ice', 'fairy'],
      notVeryEffective: ['steel', 'fire', 'water', 'electric'],
      noEffect: [],
    },
    defense: {
      weakTo: ['fighting', 'ground', 'fire'],
      resistTo: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
      immuneTo: ['poison'],
    },
  },
  fire: {
    nameKo: '불꽃',
    offense: {
      superEffective: ['bug', 'steel', 'grass', 'ice'],
      notVeryEffective: ['rock', 'fire', 'water', 'dragon'],
      noEffect: [],
    },
    defense: {
      weakTo: ['ground', 'rock', 'water'],
      resistTo: ['bug', 'steel', 'fire', 'grass', 'ice', 'fairy'],
      immuneTo: [],
    },
  },
  water: {
    nameKo: '물',
    offense: {
      superEffective: ['ground', 'rock', 'fire'],
      notVeryEffective: ['water', 'grass', 'dragon'],
      noEffect: [],
    },
    defense: {
      weakTo: ['grass', 'electric'],
      resistTo: ['steel', 'fire', 'water', 'ice'],
      immuneTo: [],
    },
  },
  grass: {
    nameKo: '풀',
    offense: {
      superEffective: ['ground', 'rock', 'water'],
      notVeryEffective: ['flying', 'poison', 'bug', 'steel', 'fire', 'grass', 'dragon'],
      noEffect: [],
    },
    defense: {
      weakTo: ['flying', 'poison', 'bug', 'fire', 'ice'],
      resistTo: ['ground', 'water', 'grass', 'electric'],
      immuneTo: [],
    },
  },
  electric: {
    nameKo: '전기',
    offense: {
      superEffective: ['flying', 'water'],
      notVeryEffective: ['grass', 'electric', 'dragon'],
      noEffect: ['ground'],
    },
    defense: {
      weakTo: ['ground'],
      resistTo: ['flying', 'steel', 'electric'],
      immuneTo: [],
    },
  },
  psychic: {
    nameKo: '에스퍼',
    offense: {
      superEffective: ['fighting', 'poison'],
      notVeryEffective: ['steel', 'psychic'],
      noEffect: ['dark'],
    },
    defense: {
      weakTo: ['bug', 'ghost', 'dark'],
      resistTo: ['fighting', 'psychic'],
      immuneTo: [],
    },
  },
  ice: {
    nameKo: '얼음',
    offense: {
      superEffective: ['flying', 'ground', 'grass', 'dragon'],
      notVeryEffective: ['steel', 'fire', 'water', 'ice'],
      noEffect: [],
    },
    defense: {
      weakTo: ['fighting', 'rock', 'steel', 'fire'],
      resistTo: ['ice'],
      immuneTo: [],
    },
  },
  dragon: {
    nameKo: '드래곤',
    offense: {
      superEffective: ['dragon'],
      notVeryEffective: ['steel'],
      noEffect: ['fairy'],
    },
    defense: {
      weakTo: ['ice', 'dragon', 'fairy'],
      resistTo: ['fire', 'water', 'grass', 'electric'],
      immuneTo: [],
    },
  },
  dark: {
    nameKo: '악',
    offense: {
      superEffective: ['ghost', 'psychic'],
      notVeryEffective: ['fighting', 'dark', 'fairy'],
      noEffect: [],
    },
    defense: {
      weakTo: ['fighting', 'bug', 'fairy'],
      resistTo: ['ghost', 'dark'],
      immuneTo: ['psychic'],
    },
  },
  fairy: {
    nameKo: '페어리',
    offense: {
      superEffective: ['fighting', 'dragon', 'dark'],
      notVeryEffective: ['poison', 'steel', 'fire'],
      noEffect: [],
    },
    defense: {
      weakTo: ['poison', 'steel'],
      resistTo: ['fighting', 'bug', 'dark'],
      immuneTo: ['dragon'],
    },
  },
};

export const TYPE_ORDER: TypeId[] = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
];

const ORDER_INDEX: Map<TypeId, number> = new Map(TYPE_ORDER.map((id, i) => [id, i]));

function sortByTypeOrder(ids: TypeId[]): TypeId[] {
  return [...ids].sort((a, b) => ORDER_INDEX.get(a)! - ORDER_INDEX.get(b)!);
}

export const TYPES: Record<TypeId, TypeInfo> = TYPE_ORDER.reduce((acc, id) => {
  acc[id] = {
    id,
    nameKo: RAW[id].nameKo,
    iconPath: `/types/${id}.svg`,
    offense: {
      superEffective: sortByTypeOrder(RAW[id].offense.superEffective),
      notVeryEffective: sortByTypeOrder(RAW[id].offense.notVeryEffective),
      noEffect: sortByTypeOrder(RAW[id].offense.noEffect),
    },
    defense: {
      weakTo: sortByTypeOrder(RAW[id].defense.weakTo),
      resistTo: sortByTypeOrder(RAW[id].defense.resistTo),
      immuneTo: sortByTypeOrder(RAW[id].defense.immuneTo),
    },
  };
  return acc;
}, {} as Record<TypeId, TypeInfo>);

export function hasImmunity(id: TypeId): boolean {
  const t = TYPES[id];
  return t.offense.noEffect.length > 0 || t.defense.immuneTo.length > 0;
}

export function hasOffenseImmunity(id: TypeId): boolean {
  return TYPES[id].offense.noEffect.length > 0;
}

export function hasDefenseImmunity(id: TypeId): boolean {
  return TYPES[id].defense.immuneTo.length > 0;
}

export function offenseScore(id: TypeId): number {
  const o = TYPES[id].offense;
  return o.superEffective.length * 2 - o.notVeryEffective.length - o.noEffect.length * 2;
}

export function defenseScore(id: TypeId): number {
  const d = TYPES[id].defense;
  return d.immuneTo.length * 2 + d.resistTo.length - d.weakTo.length * 2;
}

export interface RankGroup {
  max: TypeId[];
  min: TypeId[];
}

export interface RankLeaders {
  strength: RankGroup;
  halfDamage: RankGroup;
  noEffect: RankGroup;
  weakness: RankGroup;
  resist: RankGroup;
  immune: RankGroup;
}

export function rankLeaders(): RankLeaders {
  const pickGroup = (getCount: (id: TypeId) => number): RankGroup => {
    const counts: number[] = TYPE_ORDER.map(getCount);
    const max: number = Math.max(...counts);
    const min: number = Math.min(...counts);
    return {
      max: TYPE_ORDER.filter((id) => getCount(id) === max),
      min: TYPE_ORDER.filter((id) => getCount(id) === min),
    };
  };
  return {
    strength: pickGroup((id) => TYPES[id].offense.superEffective.length),
    halfDamage: pickGroup((id) => TYPES[id].offense.notVeryEffective.length),
    noEffect: pickGroup((id) => TYPES[id].offense.noEffect.length),
    weakness: pickGroup((id) => TYPES[id].defense.weakTo.length),
    resist: pickGroup((id) => TYPES[id].defense.resistTo.length),
    immune: pickGroup((id) => TYPES[id].defense.immuneTo.length),
  };
}
