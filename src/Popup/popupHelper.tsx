// 浮层的位置
const ToolTipPlacements = ['top', 'left', 'right', 'bottom'] as const;
export type ToolTipPlacement = (typeof ToolTipPlacements)[number];

// 触发的条件
const TooltipTriggers = ['hover', 'click', 'focus'] as const;
export type TooltipTrigger = (typeof TooltipTriggers)[number];


export function getPosition(
  triggerElement: HTMLElement,
  tooltipElement: HTMLElement,
  placement: 'left' | 'top' | 'bottom' | 'right',
) {
  const { left, width, top, height } = triggerElement.getBoundingClientRect();
  const { height: height2, width: width2 } =
    tooltipElement.getBoundingClientRect();
  const position = {
    top: {
      top: window.scrollY + top - height2,
      left: window.scrollX + left + (width - width2) / 2,
    },
    bottom: {
      top: window.scrollY + top + height,
      left: window.scrollX + left + (width - width2) / 2,
    },
    left: {
      top: window.scrollY + top + (height - height2) / 2,
      left: window.scrollX + left - width2,
    },
    right: {
      top: window.scrollY + top + (height - height2) / 2,
      left: window.scrollX + left + width,
    },
  };

  return {
    top: position[placement].top,
    left: position[placement].left,
  };
}
