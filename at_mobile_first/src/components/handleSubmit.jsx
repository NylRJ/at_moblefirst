import { toast } from 'react-toastify';

// Exemplo de uso dentro de um componente
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Sua lógica de salvamento
        toast.success('Operação realizada com sucesso!');
    } catch (error) {
        toast.error('Erro ao realizar a operação!');
    }
};
