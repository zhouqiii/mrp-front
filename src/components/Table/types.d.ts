interface DynamicObject {
  [key: string]: any
}

export interface AAction extends DynamicObject {
  icon: string
  label: string
}
