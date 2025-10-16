export interface UResponse<T> {
  code: 'SUCCESS' | 'ERROR';
  range_start: number;
  range_end: number;
  cursor_next: string;
  data: T[];
  msg: 'success' | 'error';
  pagination: { page_num: number; page_size: number; total: number };
}

export interface UUser {
  access_policies: UAccessPolicy[];
  access_policy_ids: string[];
  employee_number: string;
  first_name: string;
  id: string;
  last_name: string;
  user_email: string;
  nfc_cards: any[]; // adjust if you have a structure for NFC cards
  onboard_time: number;
  pin_code: string | null;
  status: string;
}

export interface UAccessPolicy {
  id: string;
  name: string;
  resources: UResource[];
  schedule_id: string;
}

interface UResource {
  id: string;
  type: string;
}
