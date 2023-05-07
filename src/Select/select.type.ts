import { CSSProperties } from "react";

export interface SelectProps<T extends SelectKeysType = SelectKeysBaseType> {
  defaultValue?: SelectValue<T>;
  value?: SelectValue<T>;
  onChange?: (value: SelectProps<T>['value']) => void;
  /**
   * 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 { value: string, label: ReactNode } 的格式
   */
  labelInValue?: boolean
  /**
   * 用来定义 value / label 在 `options` 中对应的字段别名
   */
  keys?: T;
  /**
   * 设置 Select 的模式为多选或标签
   */
  mode?: ModeType;
  /**
   * 是否开启多选
   */
  placeHolder?: string;
  /**
   * 是否可以清除
   */
  allowClear?: boolean
  style?: CSSProperties;
}

export type ModeType = 'multiple' | 'tags'


export type SelectValue<T extends SelectKeysType = SelectKeysBaseType> =
  | number
  | string
  | string[]
  | number[]
  | { [K in T['label'] | T['value'] | string]: string; }
  | { [K in T['label'] | T['value'] | string]: string }[]


export type SelectKeysBaseType = { label: 'label', value: 'value' }

export interface SelectKeysType {
  value: string;
  label: string;
}
