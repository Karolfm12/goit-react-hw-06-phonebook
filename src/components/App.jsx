import { addContact, deleteContact, setFilter } from 'contactSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const contactList = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  const handleOnChange = e => {
    if (e.target.name === 'firstName') {
      setName(e.target.value);
    }
    if (e.target.name === 'phone') {
      setPhoneNumber(e.target.value);
    }
    if (e.target.name === 'filter') {
      dispatch(setFilter(e.target.value));
    }
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    dispatch(addContact({ name, phoneNumber }));
    setName('');
    setPhoneNumber('');
  };

  const handleOnDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteContact(id));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={handleOnSubmit}>
        <h2>Name:</h2>
        <input
          type="text"
          name="firstName"
          value={name}
          onChange={handleOnChange}
        />
        <h2>Phone number:</h2>
        <input
          type="number"
          name="phone"
          value={phoneNumber}
          onChange={handleOnChange}
        />
        <div>
          <button type="submit">OK</button>
        </div>
      </form>
      <div>
        <ul>
          {contactList.map((value, index) => {
            return (
              <li key={index}>
                {value.name} {value.phoneNumber}{' '}
                <button onClick={e => handleOnDelete(e, index)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>Find contact by name:</h3>
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={handleOnChange}
        />
        <ul>
          {filter &&
            contactList
              .filter(filteredValue =>
                filteredValue.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map((val, index) => <li key={index}>{val.name}</li>)}
        </ul>
      </div>
    </>
  );
};
