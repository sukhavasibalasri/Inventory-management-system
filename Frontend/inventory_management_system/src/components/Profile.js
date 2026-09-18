import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile({ user, onUserUpdate }) {
    const savedUser = JSON.parse(localStorage.getItem('imsUser') || '{}');
    const [form, setForm] = useState({
        name: user.name || savedUser.name || '',
        email: user.email || savedUser.email || '',
        phone: user.phone || savedUser.phone || '',
        purpose: user.purpose || savedUser.purpose || '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('imsToken');

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await fetch('http://localhost:3001/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Unable to load profile.');
                setForm((currentForm) => ({ ...currentForm, ...data.user }));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [token]);

    const updateField = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const saveProfile = async (event) => {
        event.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await fetch('http://localhost:3001/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: form.name, phone: form.phone, purpose: form.purpose }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Unable to save profile.');
            localStorage.setItem('imsUser', JSON.stringify(data.user));
            onUserUpdate(data.user);
            setForm(data.user);
            setMessage('Profile saved successfully.');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className='auth_page'>
            <section className='auth_card profile_card'>
                <p className='home_kicker'>ACCOUNT PROFILE</p>
                <h1>Your profile</h1>
                <p className='auth_subtitle'>Add a few details so your IMS workspace is easier to identify.</p>
                {loading ? <p>Loading profile...</p> : <form onSubmit={saveProfile}>
                    <label htmlFor='profile_name'>Name</label>
                    <input id='profile_name' name='name' type='text' value={form.name} onChange={updateField} required />
                    <label htmlFor='profile_email'>Email</label>
                    <input id='profile_email' name='email' type='email' value={form.email} readOnly />
                    <label htmlFor='profile_phone'>Phone number</label>
                    <input id='profile_phone' name='phone' type='tel' placeholder='Enter phone number' value={form.phone || ''} onChange={updateField} />
                    <label htmlFor='profile_purpose'>Purpose</label>
                    <textarea id='profile_purpose' name='purpose' rows='4' placeholder='How will you use IMS?' value={form.purpose || ''} onChange={updateField} />
                    {error && <p className='auth_error'>{error}</p>}
                    {message && <p className='profile_success'>{message}</p>}
                    <button className='auth_button' type='submit'>Save profile</button>
                </form>}
                {!loading && <div className='saved_profile_details'>
                    <h2>Saved information</h2>
                    <p><strong>Name:</strong> {form.name || 'Not added'}</p>
                    <p><strong>Email:</strong> {form.email || 'Not added'}</p>
                    <p><strong>Phone:</strong> {form.phone || 'Not added'}</p>
                    <p><strong>Purpose:</strong> {form.purpose || 'Not added'}</p>
                </div>}
                <button className='profile_back' type='button' onClick={() => navigate('/')}>Back to IMS</button>
            </section>
        </main>
    );
}
