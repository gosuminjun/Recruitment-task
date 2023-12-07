export interface FormData {
  [key: string]: { formOrder: number; name: string; password: string };
}

export interface AddUserFormProps {
  index: string;
  formOrder: number;
  onFormUpdate: (name: string, password: string) => void;
  onDeleteForm: (index: string) => void;
}
