export interface OfficeRNDAuth {
  access_token: string;
  expires_in: number;
}

export interface RndListResponse<T> {
  range_start: number;
  range_end: number;
  cursor_next: string;
  results: T[];
}

export interface RndUser {
  properties: {
    Work_Situation?: string[];
    hubspot_sync_errors?: string[];
    hubspot_link_id?: string | null;
    slack_id?: string;
    slack_team_id?: string;
    slack_invited?: boolean;
  };
  _id: string;
  name: string;
  email: string;
  location: string;
  company: string;
  status: string;
  start_date: string;
  created_at: string;
  modified_at: string;
}

export interface RndMembership {
  _id: string;
  member: string;
  organization: string;
  role: string;
  created_at: string;
  modified_at: string;
  plan: string;
}

export interface RndPlan {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration_months: number;
  created_at: string;
  modified_at: string;
}
