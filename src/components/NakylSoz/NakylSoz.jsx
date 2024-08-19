import React, { useState, useEffect } from 'react';
import axios from 'axios';


const NakylSoz = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = 'https://65ac2f01fcd1c9dcffc7b274.mockapi.io/Muslim';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(url);
      setItems(response.data);
    } catch (err) {
      setError('Failed to fetch data: ' + err.message);
      console.error('Fetch Error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!description || !image || !name) {
        throw new Error('All fields are required');
      }

      const formData = new FormData();
      formData.append('description', description);
      formData.append('avatar', image);
      formData.append('Author', name);
      formData.append('createdAt', new Date().toISOString());

      if (editMode) {
        await axios.put(`${url}/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      fetchItems();
      setDescription('');
      setImage(null);
      setName('');
      setEditMode(false);
      setEditId(null);
    } catch (err) {
      setError('Failed to submit data: ' + err.message);
      console.error('Submit Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setDescription(item.description);
    setName(item.Author);
    setEditId(item.id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${url}/${id}`);
      fetchItems();
    } catch (err) {
      setError('Failed to delete data: ' + err.message);
      console.error('Delete Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nakyl-container">
      <form className="nakyl-form" onSubmit={handleSubmit}>
        <h2>{editMode ? 'Edit Nakyl Soz' : 'Submit Your Nakyl Soz'}</h2>
        <input
          type="text"
          placeholder="Add your description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Add your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : editMode ? 'Update' : 'Submit'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>

      <div className="nakyl-items">
        {items.map((item) => (
          <div key={item.id} className="nakyl-card">
            <img src={item.avatar} alt={`${item.Author}'s avatar`} className="nakyl-avatar" />
            <div className="nakyl-content">
              <h3>{item.Author}</h3>
              <p>{item.description}</p>
              <small>{new Date(item.createdAt).toLocaleString()}</small>
              <div className="nakyl-actions">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NakylSoz;
