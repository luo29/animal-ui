// 浮层的位置
const PopupPlacements = ['top', 'left', 'right', 'bottom'] as const;
export type PopupPlacement = (typeof PopupPlacements)[number];

// 触发的条件
const PopupTriggers = ['hover', 'click', 'focus'] as const;
export type PopupTrigger = (typeof PopupTriggers)[number];
