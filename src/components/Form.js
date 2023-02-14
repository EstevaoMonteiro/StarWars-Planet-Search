import React, { useContext, useEffect, useState } from 'react';
import ContextApi from '../context/ContextApi';

const sentences = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];
const comparacao = ['maior que', 'menor que', 'igual a'];

function Form() {
  const {
    amount, setAmount, filters, setFilters, setOrder,
    capitalLetter } = useContext(ContextApi);

  const [pillar, setPillar] = useState([...sentences]);

  const [strainer, setStrainer] = useState({
    column: pillar[0],
    comparison: comparacao[0],
    value: 0,
  });

  const [position, setPosition] = useState({
    column: sentences[0],
    order: 'ASC',
  });

  useEffect(() => {
    const newPillar = pillar;
    filters.forEach(({ column }) => {
      const sentence = newPillar.findIndex((value) => (value === column));
      if (sentence >= 0) newPillar.splice(sentence, 1);
    });
    setPillar(newPillar);
    setStrainer({
      column: pillar[0],
      comparison: comparacao[0],
      value: 0,
    });
  }, [filters, pillar]);

  const handleChange = ({ target: { name, value } }) => {
    setStrainer({ ...strainer, [name]: Number(value) || value });
  };

  const handleOrderChange = ({ target: { name, value } }) => {
    setPosition({ ...position, [name]: value });
  };

  const handleOrderSentence = ({ target: { name, value } }) => {
    setPosition({ ...position, [name]: value });
  };

  const handleClick = () => setFilters([...filters, strainer]);

  const handleOrder = () => setOrder(position);

  const handleRemove = (index, number = 1) => {
    const filtered = [...filters];
    filtered.splice(index, number);
    setFilters(filtered);
    setPillar([...sentences]);
  };

  return (
    <div>
      <input
        type="text"
        name="amount"
        data-testid="name-filter"
        value={ amount }
        onChange={ ({ target }) => setAmount(target.value) }
      />
      <div>
        <form>
          <label htmlFor="column">
            <select
              data-testid="column-filter"
              name="column"
              value={ strainer.column }
              onChange={ handleChange }
            >
              {pillar.map((i) => <option key={ i } value={ i }>{i}</option>)}
            </select>
          </label>
          <label htmlFor="comparison">
            Operador
            <select
              data-testid="comparison-filter"
              name="comparison"
              value={ strainer.comparison }
              onChange={ handleChange }
            >
              {comparacao.map((i) => <option key={ i } value={ i }>{i}</option>)}
            </select>
          </label>
          <input
            type="number"
            name="value"
            data-testid="value-filter"
            value={ strainer.value }
            onChange={ handleChange }
          />
          <button
            type="button"
            data-testid="button-filter"
            disabled={ !pillar.length }
            onClick={ handleClick }
          >
            Filter
          </button>
        </form>
        <form>
          <label htmlFor="sort-column">
            Order
            <select
              name="column"
              data-testid="column-sort"
              value={ position.column }
              onChange={ handleOrderSentence }
            >
              {sentences.map((i) => <option key={ i } value={ i }>{i}</option>)}
            </select>
          </label>
        </form>
        <button
          type="button"
          data-testid="button-remove-filters"
          disabled={ !filters.length }
          onClick={ () => handleRemove(0, filters.length) }
        >
          Remove
        </button>
        <label htmlFor="sort-asc">
          <input
            type="radio"
            name="sort-asc"
            data-testid="column-sort-input-asc"
            value="ASC"
            onClick={ handleOrderChange }
            defaultChecked
          />
          Aumentar
        </label>
        <label htmlFor="sort-desc">
          <input
            type="radio"
            name="sort"
            id="sort-desc"
            data-testid="column-sort-input-desc"
            value="DESC"
            onClick={ handleOrderChange }
          />
          Diminuir
        </label>
        <button type="button" onClick={ handleOrder } data-testid="column-sort-button">
          Order
        </button>
      </div>
      <ul>
        {!!filters.length && filters.map((filter, index) => (
          <li key={ index } data-testid="filter">
            <span>
              {capitalLetter(filter.column)}
              {' '}
              {filter.comparison}
              {' '}
              {filter.value}
            </span>
            <button type="button" onClick={ () => handleRemove(index) }>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Form;
