import React from 'react';

import './styles.css';
import Poll from '../../interfaces/Poll';
import PollCard from '../PollCard';

const SearchResults: React.FC<{ results: Poll[] }> = ({ results }) => {
  return (
    <div className="search-result-box">
      <ul>
        {results.map(result => (
          <PollCard key={result.id} poll={result} />
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
