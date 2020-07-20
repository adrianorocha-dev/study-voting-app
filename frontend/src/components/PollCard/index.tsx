import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import SearchBoxContext from '../../contexts/SearchBoxContext';
import Poll from '../../interfaces/Poll';

import './styles.css';

const PollCard: React.FC<{ poll: Poll }> = ({ poll }) => {
  const history = useHistory();

  const { setSearchBoxText } = useContext(SearchBoxContext)!;

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();

    history.push(`/detail/${poll.id}`);
    setSearchBoxText?.('');
  }

  return (
    <div className="poll-card" onClick={handleClick}>
      <h1 className="poll-card-title">{poll.title}</h1>
      <span>{poll.votes ?? 0} votes</span>
    </div>
  );
};

export default PollCard;
