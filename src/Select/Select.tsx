import React, { FC, PropsWithChildren, useCallback, useState, } from 'react'
import useControlled from '../hooks/useControlled';
import Popup from '../Popup'
import { SelectProvider } from './context'
import { SelectProps } from './select.type'

const Select: FC<PropsWithChildren<SelectProps>> = (props) => {
  const { mode, labelInValue, keys } = props

  const [selectedValue, selectedChange] = useControlled(
    props,
    'value',
    props.onChange,
  );

  const [visible, setVisible] = useState(false)

  const onOptionChange = useCallback(() => {

  }, [selectedChange])

  return (
    <div>
      <div onClick={() => setVisible(true)}>
        
      </div>
      <Popup visible={visible} >
        <SelectProvider
          value={selectedValue}
          mode={mode}
          labelInValue={labelInValue}
          keys={keys}
          onOptionChange={onOptionChange}
        >

        </SelectProvider>
      </Popup>
    </div>
  )
}

Select.displayName = 'Select'

export default Select
