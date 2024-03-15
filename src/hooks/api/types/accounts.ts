export interface GetMetaAccounts {
  pages:
    | {
        name: string;
        id: number;
      }[]
    | undefined;
  adAccounts:
    | {
        id: number;
        parentAccountName: string;
      }[]
    | undefined;
  selectedPage: number | undefined;
  selectedAdAccount: number | undefined;
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
