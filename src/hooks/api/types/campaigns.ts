export interface TopMetaCampaign {
  id: string;
  name: string;
  clicks: string;
  cost_per_unique_inline_link_click: number;
  impressions: string;
  spend: number;
  reach: string;
  inline_link_clicks: number;
}

export interface TopGoogleCampaign {
  id: string;
  name: string;
  clicks: number;
  impressions: number;
  spend: number;
  unique_users: number;
}
