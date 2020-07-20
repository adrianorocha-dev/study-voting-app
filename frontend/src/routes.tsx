import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Detail from './pages/Detail';
import CreatePoll from './pages/CreatePoll';
import Header from './components/Header';
import Results from './pages/Results';

import SearchBoxContext from './contexts/SearchBoxContext';
import api from './services/api';
import SearchResults from './components/SearchResults';
import Poll from './interfaces/Poll';

let lastTerm = '';

const Routes: React.FC = () => {
  const [searchBoxText, setSearchBoxText] = useState('');
  const [searchResults, setSearchResults] = useState<Poll[]>([]);

  useEffect(() => {
    if (searchBoxText !== lastTerm) {
      api
        .get<Poll[]>('polls', { params: { search: searchBoxText } })
        .then(response => {
          setSearchResults(response.data);
          lastTerm = searchBoxText;
        });
    }
  }, [searchBoxText]);

  return (
    <BrowserRouter>
      <SearchBoxContext.Provider value={{ searchBoxText, setSearchBoxText }}>
        <Header />

        {searchBoxText && <SearchResults results={searchResults} />}

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/detail/:id">
            <Detail />
          </Route>
          <Route exact path="/results/:id">
            <Results />
          </Route>
          <Route exact path="/create">
            <CreatePoll />
          </Route>
        </Switch>
      </SearchBoxContext.Provider>
    </BrowserRouter>
  );
};

export default Routes;
