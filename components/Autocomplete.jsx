'use client';
import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import api from '../service/api';

const ItemForm = () => {
    const [options, setOptions] = useState([]); // Lista de opções
    const [inputValue, setInputValue] = useState(''); // Valor digitado pelo usuário
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [openSnackbar, setOpenSnackbar] = useState(false); // Estado do Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Mensagem do Snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Severidade do Snackbar

    // Busca os itens da API
    const fetchItems = async (search = '') => {
        setLoading(true);
        try {
            const response = await api.get('/items', {
                params: {
                    title: search,
                },
            });
            setOptions(response.data.data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
            setSnackbarMessage('Erro ao buscar itens.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    // Carrega os itens ao montar o componente
    useEffect(() => {
        fetchItems();
    }, []);

    // Adiciona um novo item
    const handleAddItem = async () => {
        if (!inputValue.trim()) {
            setSnackbarMessage('O título não pode estar vazio.');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/items', {
                title: inputValue,
                body: 'Descrição padrão', // Você pode adicionar um campo para o corpo se necessário
            });

            // Atualiza a lista de opções
            setOptions((prevOptions) => [response.data, ...prevOptions]);
            setSnackbarMessage('Item adicionado com sucesso!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setInputValue(''); // Limpa o campo de entrada
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            setSnackbarMessage('Erro ao adicionar item.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    // Fecha o Snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option.title || ''}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    fetchItems(newInputValue); // Busca itens conforme o usuário digita
                }}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Buscar ou adicionar item"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                noOptionsText={
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddItem}
                        disabled={loading}
                    >
                        Adicionar "{inputValue}"
                    </Button>
                }
            />

            {/* Snackbar para feedback */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ItemForm;