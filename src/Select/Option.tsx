import React, { FC } from 'react'
import { SelectKeysBaseType, SelectKeysType } from './select.type'
import { useSelectContext } from './context'
import classNames from 'classnames';
import { useSelected } from './hooks/useSelected';

export interface OptionProps<T extends SelectKeysType = SelectKeysBaseType> {
  option: { [K in T['label'] | T['value'] | string]: string }
}

const Option: FC<OptionProps> = (props) => {
  const { onOptionChange } = useSelectContext()
  const { option } = props

  const selected = useSelected({ option })

  const onClick = () => {
    onOptionChange?.(option.value)
  }

  const className = classNames({ selected })

  return <li className={className} onClick={onClick}>{option.label}</li>
}

Option.displayName = 'Option'

export default Option


