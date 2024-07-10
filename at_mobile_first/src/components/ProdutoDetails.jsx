import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Typography, Paper, Container } from '@mui/material';

const ProdutoDetails = () => {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);

    useEffect(() => {
        const fetchProduto = async () => {
            const produtoDoc = await getDoc(doc(db, 'produtos', id));
            if (produtoDoc.exists()) {
                setProduto(produtoDoc.data());
            } else {
                console.error('No such document!');
            }
        };

        fetchProduto();
    }, [id]);

    if (!produto) {
        return <div>Carregando...</div>;
    }

    return (
        <Container>
            <Paper style={{ padding: 16 }}>
                <Typography variant="h4" component="h2">{produto.nome}</Typography>
                <Typography variant="body1">Descrição: {produto.descricao}</Typography>
                <Typography variant="body1">Valor: R$ {produto.valor}</Typography>
                <Typography variant="body1">Categoria: {produto.categoria.nome}</Typography>
                <img src={produto.imagem} alt={produto.nome} style={{ width: '100%', maxWidth: 600, marginTop: 16 }} />
            </Paper>
        </Container>
    );
};

export default ProdutoDetails;
