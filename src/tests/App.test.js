import { act, cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';

describe('App page', () => {
  beforeEach(() => {
    cleanup();
    global.fetch = jest.fn(mockFetch);
  });
  afterEach(() => jest.clearAllTimers());

  test('Testa se a página renderiza corretamente os itens', async () => {
    const { getByTestId, findByRole } = render(<App />);

    const nameFilter = getByTestId('name-filter');
    const columnFilter = getByTestId('column-filter');
    const comparisonFilter = getByTestId('comparison-filter');
    const valueFilter = getByTestId('value-filter');
    const table = await findByRole('table');
    
    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(table).toBeInTheDocument();


  });
  test('Testa se as sentenças sao atendidas como pretendido', async () => {
    const { getByTestId, findByRole } = render(<App />);

    const nameInput = getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument();

    const table = await findByRole('table');
    expect(table).toBeInTheDocument();

    const sentence = table.lastChild;
    waitFor(() => expect(sentence.childNodes.length).toBe(10));

    act(() => userEvent.type(nameInput, 'r'));

    waitFor(() => expect(sentence.childNodes.length).toBe(3));
  });
  test('Testa se os filtros estão funcionando corretamente', async () => {
    const { getByTestId, getAllByTestId, findByRole } = render(<App />);

    const columnFilter = getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();
    userEvent.selectOptions(columnFilter, 'rotation_period');

    const comparisonFilter = getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();
    userEvent.selectOptions(comparisonFilter, 'maior que');

    const valueFilter = getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    userEvent.type(valueFilter, '23');

    const table = await findByRole('table');
    expect(table).toBeInTheDocument();

    const sentence = table.lastChild;
    waitFor(() => expect(sentence.childNodes.length).toBe(10));

    const buttonFilter = getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    act(() => userEvent.click(buttonFilter));

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '12600');
    act(() => userEvent.click(buttonFilter));

    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '1000');
    act(() => userEvent.click(buttonFilter));

    const filters = getAllByTestId('filter');
    act(() => userEvent.click(filters[filters.length-1].lastChild));

    const buttonRemoveFilters = getByTestId('button-remove-filters');
    expect(buttonRemoveFilters).toBeInTheDocument();
    act(() => userEvent.click(buttonRemoveFilters));

    const sortColumn = getByTestId('column-sort');
    expect(sortColumn).toBeInTheDocument();
    userEvent.selectOptions(sortColumn, 'population');

    const columnSort = getByTestId('column-sort-input-asc');
    expect(columnSort).toBeInTheDocument();
    userEvent.click(columnSort);

    const columnSortButton = getByTestId('column-sort-button');
    expect(columnSortButton).toBeInTheDocument();
    userEvent.click(columnSortButton);
  })
  //
});