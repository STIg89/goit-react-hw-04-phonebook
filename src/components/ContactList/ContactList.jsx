import { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Item, DelButton } from './ContactList.styled';

export class ContactList extends Component {
  render() {
    return (
      <List>
        {this.props.contacts.map(({ id, name, number }) => (
          <Item key={id}>
            {name}: {number}
            <DelButton
              type="button"
              onClick={() => this.props.deleteContact(id)}
            >
              Delete
            </DelButton>
          </Item>
        ))}
      </List>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
