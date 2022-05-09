import { useSelector, useDispatch } from 'react-redux';
import ContactForm from './NewContactForm/NewContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './ContactsFilter/ContactsFilter';
import { remove, filter } from '../redux/store';


function App() {
  const dispatch = useDispatch();
  const contactsFilter = useSelector(state => state.contacts.filter);
  const contactsItems = useSelector(state => state.contacts.items);

  const findContacts = fieldValue => {
    const lowerValue = fieldValue.toLowerCase();
    const filteredContacts = contactsItems.filter(contact => {
      return (
        contact.name.toLowerCase().includes(lowerValue) ||
        contact.number.includes(lowerValue)
      );
    });
    return filteredContacts;
  };

  const deleteFoo = id => {
    dispatch(remove(id));
  };

  const changeFilter = e => {
    dispatch(filter(e.target.value));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm
        contactsArr={contactsItems.map(contact => contact.name.toLowerCase())}
      />

      <h2>Contacts</h2>
      <Filter value={contactsFilter} changeFilter={changeFilter} />
      <ContactsList data={findContacts(contactsFilter)} deleteFoo={deleteFoo} />
    </>
  );
}

export default App;
