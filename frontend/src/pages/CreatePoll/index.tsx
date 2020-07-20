import React, { useState, useEffect } from 'react';

import './styles.css';
import { IoIosClose } from 'react-icons/io';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

const CreatePoll: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [closingDate, setClosingDate] = useState('');
  const [newOption, setNewOption] = useState('');

  const history = useHistory();

  function handleAddOption() {
    if (newOption) {
      setOptions([...options, newOption]);
      setNewOption('');
    }
  }

  function handleRemoveOption(option: string) {
    setOptions(options.filter(item => item !== option));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({ title, description, options, closingDate });

    const result = await api.post('polls', {
      title,
      description,
      options,
      closingDate,
    });

    console.log(result);

    history.push('/');
  }

  return (
    <div className="create-container">
      <section>
        <h1>Create new poll</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="poll-title">Pool title:</label>
            <input
              id="poll-title"
              type="text"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="poll-description">Pool description:</label>
            <input
              id="poll-description"
              type="text"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </div>

          <div className="input-group">
            <p>Options:</p>
            <ul className="option-list">
              {options.map((option, index) => (
                <li key={index}>
                  {option}{' '}
                  <IoIosClose
                    size={20}
                    color="#f00"
                    cursor="pointer"
                    onClick={() => handleRemoveOption(option)}
                  />
                </li>
              ))}
            </ul>

            <div className="add-option">
              <input
                type="text"
                value={newOption}
                onChange={event => setNewOption(event.target.value)}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleAddOption();
                  }
                }}
              />
              <button
                className="button-save"
                type="button"
                onClick={handleAddOption}
              >
                Add
              </button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="poll-description">Closing date:</label>
            <input
              id="poll-description"
              type="date"
              value={closingDate}
              onChange={event => setClosingDate(event.target.value)}
            />
          </div>
          <button className="button-save">Save</button>
        </form>
      </section>
    </div>
  );
};

export default CreatePoll;
