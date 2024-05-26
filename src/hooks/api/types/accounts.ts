export interface GetMetaAccounts {
  pages:
    | {
        name: string;
        id: number;
      }[]
    | undefined;
  adAccounts: MetaAdAccount[] | undefined;
  selectedPage: number | undefined;
  selectedAdAccount: number | undefined;
}

export interface MetaAdAccount {
  id: number;
  parentAccountName: string;
}

export interface GetGoogleAccounts {
  analyticsAccounts: GoogleAnalyticsAccount[];
  adAccounts: {
    id: number;
  }[];
  selectedAnalyticsAccount: number | undefined;
  selectedAdAccount: number | undefined;
}

export interface GoogleAnalyticsAccount {
  id: number;
  name: string;
  parentAccountName: string;
}

export interface GoogleAdAccount {
  id: number;
}
