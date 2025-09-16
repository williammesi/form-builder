// Form element types
export type FormElementType = 'input' | 'select' | 'textarea' | 'checkbox-group' | 'radio-group'
export type InputType = 'text' | 'email' | 'password' | 'number'

// Interface for form elements
export interface FormElement {
  id: string
  type: FormElementType
  label: string
  placeholder?: string
  options?: string[] // For select, checkbox-group, radio-group
  required: boolean
  inputType?: InputType // For input elements only
  rows?: number // For textarea only
  groupTitle?: string // For checkbox-group and radio-group
}

// Template for creating new elements (without ID)
export type ElementTemplate = Omit<FormElement, 'id'>

// Form metadata interface
export interface FormMetadata {
  title: string
  description: string
  uuid: string
  createdAt: Date
  updatedAt: Date
}