import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Autocomplete from '../../components/Autocomplete';
import api from '../../service/api';

// Criar um mock da API antes dos testes
jest.mock('../../service/api');

beforeEach(() => {
    api.get.mockResolvedValue({
        data: {
            data: [
                { id: 1, title: 'asawrfaw' },
                { id: 2, title: 'outra opção' }
            ]
        }
    });
});


test('renders Autocomplete component correctly', async () => {
    render(<Autocomplete />);

    // Selecionar o input do Autocomplete
    const inputElement = screen.getByRole('combobox');

    // Simular digitação no input
    await userEvent.type(inputElement, 'asawrfaw');

    // Esperar que a opção apareça na tela
    await waitFor(() => {
        expect(screen.getByText('asawrfaw')).toBeInTheDocument();
    });
});
