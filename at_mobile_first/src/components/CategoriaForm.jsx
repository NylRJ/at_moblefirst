import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const CategoriaForm = ({ onSubmit }) => {
    const [categoria, setCategoria] = useState({
        nome: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "categorias"), categoria);
            onSubmit(categoria);
        } catch (e) {
            console.error("Erro ao adicionar categoria: ", e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField name="nome" label="Nome da Categoria" value={categoria.nome} onChange={handleChange} fullWidth />
            <Button type="submit" variant="contained" color="primary">Salvar</Button>
        </form>
    );
};

export default CategoriaForm;
