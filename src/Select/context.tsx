import React, { createContext, useContext, useMemo, PropsWithChildren } from "react";
import { ModeType, SelectKeysType, SelectValue } from "./select.type";

interface SelectContextValue {
  value?: SelectValue;
  mode?: ModeType;
  onOptionChange?: (value: string | number) => void;
  /**
   * 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 { value: string, label: ReactNode } 的格式
   */
  labelInValue?: boolean
  /**
   * 用来定义 value / label 在 `options` 中对应的字段别名
   */
  keys?: SelectKeysType
}

export const SelectContext = createContext<SelectContextValue>({})

export const SelectProvider = (props: PropsWithChildren<SelectContextValue>) => {
  const { mode, onOptionChange, children } = props

  const contextValue = useMemo(() => ({
    mode,
    onOptionChange
  }), [mode, onOptionChange])

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  )
}

export const useSelectContext = () => {
  return useContext(SelectContext)
}
