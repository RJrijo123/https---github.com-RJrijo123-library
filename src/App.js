import React, { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import axios from 'axios';

const App = () => {
  const [bookToEdit, setBookToEdit] = useState(null);
  const [books, setBooks] = useState([]);

  const handleEdit = (book) => {
    setBookToEdit(book);
  };

  const handleSave = (savedBook) => {
    if (bookToEdit) {
      setBooks(books.map(book => (book._id === savedBook._id ? savedBook : book)));
    } else {
      setBooks([...books, savedBook]);
    }
    setBookToEdit(null);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/books/${id}`)
      .then(() => setBooks(books.filter(book => book._id !== id)))
      .catch(error => console.error('Error deleting book:', error));
  };

  const handleCancel = () => {
    setBookToEdit(null);
  };

  return (
    <div>
      <h1 style={{fontSize: '70px', color: 'gray'}}>LIBRARY</h1>
      <BookForm bookToEdit={bookToEdit} onSave={handleSave} onCancel={handleCancel} />
      <BookList onEdit={handleEdit} onDelete={handleDelete} />
      
    </div>
  );
};

export default App;
