import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Typography, Paper, Container } from '@mui/material';

const EmpresaDetails = () => {
    const { id } = useParams();
    const [empresa, setEmpresa] = useState(null);

    useEffect(() => {
        const fetchEmpresa = async () => {
            const empresaDoc = await getDoc(doc(db, 'empresas', id));
            if (empresaDoc.exists()) {
                setEmpresa(empresaDoc.data());
            } else {
                console.error('No such document!');
            }
        };

        fetchEmpresa();
    }, [id]);

    if (!empresa) {
        return <div>Carregando...</div>;
    }

    return (
        <Container>
            <Paper style={{ padding: 16 }}>
                <Typography variant="h4" component="h2">{empresa.nome}</Typography>
                <Typography variant="body1">CNPJ: {empresa.cnpj}</Typography>
                <Typography variant="body1">Site: <a href={empresa.site} target="_blank" rel="noopener noreferrer">{empresa.site}</a></Typography>
                <Typography variant="body1">Endereço: {empresa.endereco}</Typography>
                <Typography variant="h6" component="h3">Representante</Typography>
                <Typography variant="body1">Nome: {empresa.representante.nome}</Typography>
                <Typography variant="body1">Cargo: {empresa.representante.cargo}</Typography>
                <Typography variant="body1">Telefone: {empresa.representante.telefone}</Typography>
                <Typography variant="body1">Email: <a href={`mailto:${empresa.representante.email}`}>{empresa.representante.email}</a></Typography>
            </Paper>
        </Container>
    );
};

export default EmpresaDetails;
