import classnames from 'classnames';
import React, { useRef } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import Portal from '../common/Portal';
import useControlled from '../hooks/useControlled';
import { useTrigger } from './hooks/useTrigger';
import './Popup.less';
import { PopupPlacement, PopupTrigger } from './type';

export interface TooltipProps {
  classname?: string;
  placement?: PopupPlacement;
  trigger?: PopupTrigger;
  // 控制显隐
  visible?: boolean;

  content?: string;
  // 是否显示空内容
  hideEmptyPopup?: boolean;

  // 浮层关闭时是否销毁浮层
  destroyOnClose?: boolean;

  children?: React.ReactNode;

  attach: string;
  /**
   * 当浮层隐藏或显示时触发，`trigger=document` 表示点击非浮层元素触发；`trigger=context-menu` 表示右击触发
   */
  onVisibleChange?: (visible: boolean) => void;
  delay?: number;
}

const Popup: React.FC<TooltipProps> = (props) => {
  const {
    children,
    content,
    placement = 'left',
    trigger = 'click',
    attach,
    ...rest
  } = props;
  const [visible, onVisibleChange] = useControlled(
    props,
    'visible',
    props.onVisibleChange,
  );
  const portalRef = useRef(null); // portal dom 元素
  const { tooltipRef, getTriggerNode, position, getPopupProps } = useTrigger({
    visible,
    onVisibleChange,
    placement,
    trigger,
  });

  const triggerNode = getTriggerNode(children);
  return (
    <>
      <Portal attach={attach} ref={portalRef}>
        <CSSTransition
          appear
          in={visible}
          timeout={5000}
          classNames="why"
          nodeRef={tooltipRef}
        >
          <div
            className={classnames('a-tooltip-text', {
              why: visible,
              [`a-tooltip-${placement}`]: placement,
            })}
            // eslint-disable-next-line react/no-unknown-property

            ref={tooltipRef}
            {...rest}
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
