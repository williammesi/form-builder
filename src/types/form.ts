// Interface for form elements
export interface FormElement {
  id: string; // Unique ID for stable rendering and drag-and-drop
  type: 'input' | 'select'; // Supported form types
  label: string; // Display label
  placeholder?: string; // Optional placeholder for inputs
  options?: string[]; // Options for select type
  required: boolean; // Is the field required
  inputType?: 'text' | 'email' | 'password'; // Input type for input fields (default: 'text')
}

export type ElementTemplate = Omit<FormElement, 'id'>

export interface FormMetadata {
  title: string;
  description: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}