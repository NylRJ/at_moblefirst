import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Email de recuperação enviado!');
            navigate('/login');
        } catch (error) {
            toast.error('Erro ao enviar email de recuperação: ' + error.message);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>Recuperar Senha</Typography>
            <form onSubmit={handlePasswordReset} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Enviar Email de Recuperação</Button>
            </form>
        </div>
    );
};

export default RecoverPassword;
