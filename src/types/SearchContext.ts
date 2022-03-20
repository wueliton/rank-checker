export interface SearchContextType {
  search: SearchContextSearchDataType;
  setSearch: (search: SearchContextSearchDataType) => void;
  finishActualSearch: () => void;
  handleSearchError: () => void;
}

export interface SearchContextSearchDataType {
  keywords: string[];
  client: string;
  url: string;
  status: "pending" | "runing" | "finished" | "error";
}
