import { useState } from 'react';

export const App = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contactList, setContactList] = useState([]);

  const handleOnChange = e => {
    if (e.target.name === 'firstName') {
      setName(e.target.value);
    }
    if (e.target.name === 'phone') {
      setPhoneNumber(e.target.value);
    }
  };

  const handleOnClick = e => {
    e.preventDefault();
    setContactList(prev => [...prev, { name, phoneNumber }]);
    setName('');
    setPhoneNumber('');
  };
  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={handleOnClick}>
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
                {value.name} {value.phoneNumber}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
