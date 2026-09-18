import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const updateField = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const submit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Unable to log in.');
            localStorage.setItem('imsToken', data.token);
            localStorage.setItem('imsUser', JSON.stringify(data.user));
            onLogin(data.user);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='auth_page'>
            <div className='auth_card'>
                <p className='home_kicker'>WELCOME BACK</p>
                <h1>Log in to IMS</h1>
                <p className='auth_subtitle'>Manage your inventory from one focused workspace.</p>
                <form onSubmit={submit}>
                    <label htmlFor='login_email'>Email</label>
                    <input id='login_email' name='email' type='email' value={form.email} onChange={updateField} required />
                    <label htmlFor='login_password'>Password</label>
                    <input id='login_password' name='password' type='password' value={form.password} onChange={updateField} required />
                    {error && <p className='auth_error'>{error}</p>}
                    <button className='auth_button' type='submit' disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
                </form>
                <p className='auth_switch'>New to IMS? <Link to='/register'>Create an account</Link></p>
            </div>
        </div>
    );
}
