import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookForm.css';

const BookForm = ({ bookToEdit, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setYear(bookToEdit.year);
      setGenre(bookToEdit.genre);
    }
  }, [bookToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = { title, author, year: Number(year), genre };

    if (bookToEdit) {
      axios.put(`http://localhost:5000/api/books/${bookToEdit._id}`, book)
        .then(response => onSave(response.data))
        .catch(error => console.error('Error updating book:', error));
    } else {
      axios.post('http://localhost:5000/api/books', book)
        .then(response => onSave(response.data))
        .catch(error => console.error('Error adding book:', error));
    }
  };

  return (

    <form className="form-container" onSubmit={handleSubmit}>
        <h1 style={{ color: 'green'}}>ADD NEW BOOK</h1>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Author</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div>
        <label>Year</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
      </div>
      <div>
        <label>Genre</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </div>
      <button type="submit">{bookToEdit ? 'Update' : 'Add'} Book</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default BookForm;
