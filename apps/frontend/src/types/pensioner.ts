export interface Pensioner {
  id: number;
  retirement_date: string;
  serial_number: string;
  control_number: string;
  rank: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  bank_name: string;
  pension_account: string;
  amount: number;
  amount_centavos: number;
  created_at: string;
  updated_at: string;
}

export type PensionerFormData = Omit<
  Pensioner,
  "id" | "created_at" | "updated_at"
>;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
