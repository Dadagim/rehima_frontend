import { useForm } from '../hooks/useForm';
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../hooks/useAuth.jsx'
import {useState} from 'react'



export default function AuthForm({ initialMode = 'login' }) {
    const [mode, setMode] = useState(initialMode);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login, register } = useAuth();
    const { values, handleChange } = useForm({username: '', email: '', password: '' , full_name: '', phone_number: ''});
    const navigate = useNavigate();
    const isLogin = mode === 'login';
    const [profile, setProfile] = useState(null);
    

    async function HandleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (mode === 'login'){
                await login({username: values.username, password: values.password});
                navigate('/profile');

            }else{
                await register({...values, profile});
                navigate('/profile');
            }
        } catch (err) {
            const responseData = err.response?.data;
            const detail = responseData?.detail;
            const message = typeof detail === 'string'
                ? detail
                : (responseData && Object.values(responseData).flat().join(' ')) ||
                    'Unable to sign in. Please try again.';
            setError(message);

        }finally {
            setLoading(false);
        }
    }
    return ( <div className="max-w-sm mx-auto mt-10 border border-gray-200 p-5 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login to you account' : 'Register to a new account'}</h1>
            <form onSubmit={HandleSubmit} className="flex flex-col gap-3">
                <Input label="Username" name="username" value={values.username} onChange={handleChange} required />

                <Input label="Password" name="password" value={values.password} onChange={handleChange} type="password" required />
                {!isLogin && (
                    <>
                        <Input label="Email" name="email" value={values.email} onChange={handleChange} type="email" required />
                        <Input label="Full name" name="full_name" value={values.full_name} onChange={handleChange} required />
                        <Input label="Phone Number" name="phone_number" value={values.phone_number} onChange={handleChange} required />
                        <Input
                            type="file"
                            label="Profile Pic"
                            name="profile"
                            accept="image/*"
                            onChange={(e) => setProfile(e.target.files?.[0] ?? null)}
                            required
                        />
                    </>
                )}

                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button variant="primary" disabled={loading}>{loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}</Button>
            </form>
            <p className="mt-4 text-sm text-center">
                {isLogin ? (
                    <>Don't have an account? <button type="button" className="text-indigo-600" onClick={() => setMode('register')}>Register</button></>
                ) : (
                    <>Have an account? <button type="button" className="text-indigo-600" onClick={() => setMode('login')}>Login</button></>
                )}
            </p>

        </div>
    );
}