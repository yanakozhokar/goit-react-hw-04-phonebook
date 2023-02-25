import css from './ContactList.module.css';

const ContactList = ({ filteredContacts, deleteContact }) => {
  return (
    <ul className={css.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li className={css.listItem} key={id}>
          {name}: {number}
          <button
            className={css.button}
            type="button"
            onClick={() => deleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
