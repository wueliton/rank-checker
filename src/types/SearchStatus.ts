import { IKeyword } from "./Keyword";

export interface ISearchStatus {
  client?: string;
  url?: string;
  status?: number;
  keywords?: IKeyword[];
  count?: number;
  message?: string;
}
