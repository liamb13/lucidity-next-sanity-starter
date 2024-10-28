export enum BLOCK_CATEGORY {
  OUTER = 'outer',
  INNER = 'inner',
}

export enum ONLY {
  OUTER = BLOCK_CATEGORY.OUTER,
  INNER = BLOCK_CATEGORY.INNER,
}

export enum WIZARD_GROUPS {
  DEFAULT = 'default', // Blocks with no group will end up in the default category
  CORE_SECTION_PATTERNS = 'coreSectionPatterns',
  NICHE = 'niche',
  REUSABLE = 'reusable',
}
