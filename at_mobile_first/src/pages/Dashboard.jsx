import React from 'react';
import { Typography } from '@mui/material';


const Dashboard = () => {
    return (
        <div>

            <div style={{ padding: '2rem' }}>
                <Typography variant="h4" gutterBottom>Bem-vindo ao Dashboard</Typography>
                <Typography variant="body1">Use o menu para navegar pelas funcionalidades do sistema.</Typography>
            </div>
        </div>
    );
};

export default Dashboard;
