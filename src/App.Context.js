import {createContext} from 'react';

const AppContext = createContext({
  selectedFilms: [],
  toggleSelectedFilms: () => {},
});

export default AppContext;