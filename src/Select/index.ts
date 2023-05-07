import _select from './Select'
import OptionsGroup from './OptionsGroup'
import Option from './Option'

type SelectType = {
  OptionsGroup: typeof OptionsGroup
  Option: typeof Option
} & typeof _select

const Select: SelectType = _select as SelectType
Select.OptionsGroup = OptionsGroup
Select.Option = Option

export default Select


