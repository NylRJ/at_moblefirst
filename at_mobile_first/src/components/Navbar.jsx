import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Sistema de Compras
                </Typography>
                <Button color="inherit" onClick={() => navigate('/cadastro-empresa')}>Cadastro Empresa</Button>
                <Button color="inherit" onClick={() => navigate('/cadastro-categoria')}>Cadastro Categoria</Button>
                <Button color="inherit" onClick={() => navigate('/cadastro-produto')}>Cadastro Produto</Button>
                <Button color="inherit" onClick={() => navigate('/listagem-empresas')}>Empresas</Button>
                <Button color="inherit" onClick={() => navigate('/listagem-categorias')}>Categorias</Button>
                <Button color="inherit" onClick={() => navigate('/listagem-produtos')}>Produtos</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
