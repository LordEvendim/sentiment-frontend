export interface GetAccounts {
  pages: {
    name: string;
    id: string;
  }[];
  selectedPage: string | undefined;
}
