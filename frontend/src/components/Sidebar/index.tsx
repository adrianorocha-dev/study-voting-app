import React, { useState } from 'react';
import { IoIosClose, IoIosMenu } from 'react-icons/io';

import { SortType } from '../../utils/sortByOption';

import './styles.css';

const options: { [key: string]: SortType } = {
  Newest: 'newest',
  'Most Viewed': 'views',
  'Most Voted': 'votes',
};

const Sidebar: React.FC<{ sortFunction: (option: SortType) => void }> = ({
  sortFunction,
}) => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState('');

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSelectSorting(key: string) {
    setSelected(key);
    sortFunction(options[key]);
  }

  return (
    <>
      <aside className={open ? undefined : 'aside-hidden'}>
        <div className="aside-header">
          <button className="button-close" onClick={handleClose}>
            <IoIosClose size={26} />
          </button>
        </div>
        <div className="filter-list-container">
          <strong>Sort by:</strong>
          <ul className="filter-list">
            {Object.keys(options).map(option => (
              <li
                key={option}
                className={
                  'filter-list-item ' + (selected === option ? 'checked' : '')
                }
                onClick={() => handleSelectSorting(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {!open && (
        <button className="button-open" onClick={handleOpen}>
          <IoIosMenu size={26} />
        </button>
      )}
    </>
  );
};

export default React.memo(Sidebar);
