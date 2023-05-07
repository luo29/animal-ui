import { useMemo } from "react";
import { OptionProps } from "../Option";
import { useSelectContext } from "../context";

type MultipleValueType = string | number | {
  [x: string]: string;
}

interface useSelectedParams {
  option: OptionProps['option']
}

export const useSelected = (params: useSelectedParams) => {
  const { option } = params
  const { value, mode, keys, labelInValue } = useSelectContext()
  const selected = useMemo(() => {
    if (!value) {
      return false
    }
    const compareKey = keys?.value || 'value'
    if ((mode === 'multiple' || mode === 'tags') && Array.isArray(value)) {
      return !!(value as MultipleValueType[]).find((item) => {
        if (!!labelInValue && typeof item === 'object') {
          return item[compareKey] === option[compareKey]
        }
        return true
      })
    } else if (typeof value !== 'object') {
      return value === option[compareKey]
    }
    return false
  }, [value, mode, keys])

  return selected
}
