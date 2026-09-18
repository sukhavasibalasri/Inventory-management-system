import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register({ onLogin }) {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const updateField = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const submit = async (event) => {
        event.preventDefault();
        setError('');
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Unable to create account.');
            localStorage.setItem('imsToken', data.token);
            localStorage.setItem('imsUser', JSON.stringify(data.user));
            onLogin(data.user);
            navigate('/products');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='auth_page'>
            <div className='auth_card'>
                <p className='home_kicker'>GET STARTED</p>
                <h1>Create your account</h1>
                <p className='auth_subtitle'>Set up your private workspace for managing products.</p>
                <form onSubmit={submit}>
                    <label htmlFor='register_name'>Name</label>
                    <input id='register_name' name='name' type='text' value={form.name} onChange={updateField} required />
                    <label htmlFor='register_email'>Email</label>
                    <input id='register_email' name='email' type='email' value={form.email} onChange={updateField} required />
                    <label htmlFor='register_password'>Password</label>
                    <input id='register_password' name='password' type='password' minLength='6' value={form.password} onChange={updateField} required />
                    <label htmlFor='register_confirmPassword'>Confirm password</label>
                    <input id='register_confirmPassword' name='confirmPassword' type='password' value={form.confirmPassword} onChange={updateField} required />
                    {error && <p className='auth_error'>{error}</p>}
                    <button className='auth_button' type='submit' disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</button>
                </form>
                <p className='auth_switch'>Already registered? <Link to='/login'>Log in</Link></p>
            </div>
        </div>
    );
}
