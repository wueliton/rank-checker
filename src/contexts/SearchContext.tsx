import React from "react";
import {
  SearchContextSearchDataType,
  SearchContextType,
} from "../types/SearchContext";

const SearchContext = React.createContext<SearchContextType>(
  {} as SearchContextType
);

export const SearchContextProvider = ({ children }) => {
  const [keywordsList, setKeywordsList] =
    React.useState<SearchContextSearchDataType>({
      client: null,
      keywords: null,
      url: null,
      status: "pending",
    });

  const setSearch = (search: SearchContextSearchDataType) => {
    setKeywordsList(search);
  };

  const finishActualSearch = () =>
    setKeywordsList({
      client: null,
      keywords: null,
      url: null,
      status: "pending",
    });

  const handleSearchError = () => {
    setKeywordsList({ ...keywordsList, status: "error" });
  };

  return (
    <SearchContext.Provider
      value={{
        search: keywordsList,
        setSearch,
        finishActualSearch,
        handleSearchError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => React.useContext(SearchContext);
