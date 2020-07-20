import { createContext } from 'react';

const SearchBoxContext = createContext<
  | {
      searchBoxText: string;
      setSearchBoxText: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

export default SearchBoxContext;
