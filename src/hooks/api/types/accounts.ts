export interface GetMetaAccounts {
  pages: {
    name: string;
    id: string;
  }[];
  selectedPage: string | undefined;
}

export interface GetGoogleAccounts {
  analyticsAccounts: GoogleAnalyticsAccount[];
  selectedAnalyticsAccount: number | undefined;
}

export interface GoogleAnalyticsAccount {
  id: number;
  name: string;
  parentAccountName: string;
}
