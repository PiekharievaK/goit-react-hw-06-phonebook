import PropTypes from 'prop-types';
import { Report } from 'notiflix';
import s from './NewContactForm.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from 'redux/store';

function ContactForm(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({name: '', number: ''});


  const handleSubmit = e => {
    e.preventDefault();

    const names = props.contactsArr;

    const shortid = require('shortid');
    const name = e.target.elements.name.value;
    const number = e.target.elements.number.value;

  
    const contactInfo = { id: shortid(), name: name, number: number };

    if (names.includes(name.toLowerCase())) {
      Report.warning(
        `'${name}' is already in contacts `,
        `Please change name to create unique contact`,
        'Okay',
        {
          titleMaxLength: 1000,
        }
      );
      return;
    }
    dispatch(add(contactInfo));

   reset();
  };

  const reset = () => {
    state.name ='';
    state.number ='';
  };


  const handleChange = e => {
    const key = e.target.name;
    const value = e.target.value;
    setState(prevState => ({ ...prevState, [key]: value }));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        <span>Name</span>
        <input
          type="text"
          name="name"
          className={s.input}
          onChange={handleChange}
          value={state.name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          placeholder="Enter name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={s.label}>
        <span>Number</span>
        <input
          type="tel"
          name="number"
          className={s.input}
          onChange={handleChange}
          value={state.number}
          placeholder="Enter number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};

export default ContactForm;
