import classnames from 'classnames';
import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Portal from '../common/Portal';
import useControlled from '../hooks/useControlled';
import './Tooltip.scss';
import { useTrigger } from './hooks/useTrigger';
import { ToolTipPlacement, TooltipTrigger } from './popupHelper';

export interface PopupProps {
  classname?: string;
  placement?: ToolTipPlacement;
  trigger?: TooltipTrigger;
  // 控制显隐
  visible?: boolean;

  content?: string;
  // 是否显示空内容
  hideEmptyPopup?: boolean;

  // 浮层关闭时是否销毁浮层
  destroyOnClose?: boolean;

  children?: React.ReactNode;
  /**
   * 挂在的节点
   */
  attach?: string;
  /**
   * 当浮层隐藏或显示时触发，`trigger=document` 表示点击非浮层元素触发；`trigger=context-menu` 表示右击触发
   */
  onVisibleChange?: (visible?: boolean) => void;
  delay?: number;
}

const Popup: React.FC<PopupProps> = (props) => {
  const {
    children,
    content,
    placement = 'left',
    trigger = 'click',
    attach,
  } = props;

  const [visible, onVisibleChange] = useControlled(
    props,
    'visible',
    props.onVisibleChange,
  );

  const portalRef = useRef(null); // portal dom 元素
  const { tooltipRef, getTriggerNode, getPopupProps } = useTrigger({
    visible,
    onVisibleChange,
    placement,
    trigger,
  });

  const triggerNode = getTriggerNode(children);

  return (
    <>
      <Portal attach={attach} ref={portalRef}>
        <CSSTransition in={visible} nodeRef={tooltipRef} timeout={5000} classNames="why">
          <div
            className={classnames('g-tooltip-text', {
              'why': visible,
              [`g-tooltip-${placement}`]: placement,
            })}
            // eslint-disable-next-line react/no-unknown-property
            ref={tooltipRef}
            {...getPopupProps()}
          >
            {content}
          </div>
        </CSSTransition>
      </Portal>
      {triggerNode}
    </>
  );
};

export default Popup;
