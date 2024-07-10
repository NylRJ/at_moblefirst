import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

const CategoriaForm = ({ onSubmit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState({ nome: '' });

    useEffect(() => {
        if (id) {
            const fetchCategoria = async () => {
                const categoriaDoc = await getDoc(doc(db, 'categorias', id));
                if (categoriaDoc.exists()) {
                    setCategoria(categoriaDoc.data());
                }
            };
            fetchCategoria();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateDoc(doc(db, "categorias", id), categoria);
                await updateAssociatedProducts(id, categoria);
                toast.success('Categoria atualizada com sucesso!');
            } else {
                const newCategoriaRef = await addDoc(collection(db, "categorias"), categoria);
                await updateAssociatedProducts(newCategoriaRef.id, categoria);
                toast.success('Categoria salva com sucesso!');
            }
            onSubmit(categoria);
            navigate('/listagem-categorias'); // Redireciona para a página de listagem de categorias
        } catch (e) {
            toast.error('Erro ao salvar categoria!');
            console.error("Erro ao adicionar/atualizar categoria: ", e);
        }
    };

    const updateAssociatedProducts = async (categoriaId, novaCategoria) => {
        const q = query(collection(db, 'produtos'), where('categoria.id', '==', categoriaId));
        const produtosSnapshot = await getDocs(q);
        if (produtosSnapshot.empty) {
            console.log('Nenhum produto encontrado para atualizar.');
            return;
        }

        const batch = writeBatch(db);
        produtosSnapshot.forEach((produtoDoc) => {
            const produtoRef = doc(db, 'produtos', produtoDoc.id);
            console.log(`Atualizando produto ${produtoDoc.id} com nova categoria ${JSON.stringify(novaCategoria)}`);
            batch.update(produtoRef, {
                categoria: {
                    id: categoriaId,
                    nome: novaCategoria.nome
                }
            });
        });

        await batch.commit();
        console.log('Atualização de produtos concluída.');
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField name="nome" label="Nome da Categoria" value={categoria.nome} onChange={handleChange} fullWidth />
            <Button type="submit" variant="contained" color="primary">Salvar</Button>
        </form>
    );
};

export default CategoriaForm;
