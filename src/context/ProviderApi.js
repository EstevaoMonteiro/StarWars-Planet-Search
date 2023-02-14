import { arrayOf, node, oneOfType } from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import ContextApi from './ContextApi';

function ProviderApi({ children }) {
  const endPoint = 'https://swapi.dev/api/planets%27';
  const [planets, setPlanets] = useState([]);
  const [amount, setAmount] = useState('');
  const [filters, setFilters] = useState([]);
  const [order, setOrder] = useState(false);
  const { data } = useFetch(endPoint);

  useEffect(() => {
    if (data) {
      const remove = data.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(remove);
    }
  }, [data]);

  const capitalLetter = (i) => (
    i.split('_').map((index) => (index[0].toUpperCase() + index.substring(1))).join(' ')
  );

  const values = useMemo(() => ({
    planets,
    amount,
    filters,
    order,
    setAmount,
    setFilters,
    setOrder,
    capitalLetter,
  }), [planets, amount, filters, order]);

  return (
    <ContextApi.Provider value={ values }>
      {children}
    </ContextApi.Provider>
  );
}

ProviderApi.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default ProviderApi;
