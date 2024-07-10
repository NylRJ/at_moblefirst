import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login realizado com sucesso!');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Erro ao fazer login: ' + error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            toast.success('Login com Google realizado com sucesso!');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Erro ao fazer login com Google: ' + error.message);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Senha"
                    variant="outlined"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
            </form>
            <Button
                onClick={handleGoogleLogin}
                variant="contained"
                color="secondary"
                style={{ marginTop: '1rem' }}
                fullWidth
            >
                Login com Google
            </Button>
            <Button
                onClick={() => navigate('/recuperar-senha')}
                style={{ marginTop: '1rem' }}
            >
                Esqueceu a senha?
            </Button>
        </div>
    );
};

export default Login;
