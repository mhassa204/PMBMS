import React, { useState } from 'react';
import axios from 'axios';
import './city.css';

const EditCity = ({ city }) => {
    const [formData, setFormData] = useState({
        name: city.name || '',
        district: city.district || '',
        province: city.province || '',
        prefix: city.prefix || '',
    });

    const [loading, setLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setLoading(true);
        setSubmissionError(null);
    
        try {
            await axios.put(`http://localhost:8000/cities/${city.id}`, formData);
            console.log('City edited successfully');
            setFormData({ name: '', district: '', province: '', prefix: '' });
        } catch (error) {
            console.error('Error editing city:', error.message);
            setSubmissionError('An error occurred while submitting the form.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="edit-city-container">
            <h1 className="title">Edit City</h1>
            <form onSubmit={handleSubmit} className="form">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                />

                <label className="form-label">District</label>
                <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="form-input"
                />

                <label className="form-label">Province</label>
                <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="form-input"
                />

                <label className="form-label">Prefix</label>
                <input
                    type="text"
                    name="prefix"
                    value={formData.prefix}
                    onChange={handleChange}
                    className="form-input"
                />

                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Submitting...' : 'Edit City'}
                </button>

                {submissionError && (
                    <p className="submission-error">{submissionError}</p>
                )}
            </form>
        </div>
    );
};

export default EditCity;
