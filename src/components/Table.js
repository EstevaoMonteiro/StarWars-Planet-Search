import React, { useContext, useEffect, useState } from 'react';
import ContextApi from '../context/ContextApi';

function Table() {
  const { capitalLetter, planets,
    filters, amount, order } = useContext(ContextApi);
  const [leach, setLeach] = useState([]);

  const similePlanets = (planet, filter) => {
    const { comparison,
      column: columns,
      value: values } = filter;
    switch (comparison) {
    case 'maior que':
      return Number(planet[columns]) > Number(values);
    case 'menor que':
      return Number(planet[columns]) < Number(values);
    default:
      return Number(planet[columns]) === Number(values);
    }
  };

  const filtered = () => {
    let results = planets.filter((elem) => (
      elem.name.toLowerCase().includes(amount.toLowerCase())
    ));
    filters.forEach((i) => {
      results = results.filter((item) => similePlanets(item, i));
    });
    return results;
  };

  const orderPlanets = (element) => {
    if (order) {
      const { columns, order: line } = order;
      const array = [];
      const results = element.filter((planet) => {
        if (planet[columns] === 'unknown') {
          array.push(planet);
          return false;
        }
        return true;
      });
      results.sort((a, b) => {
        if (line === 'ASC') {
          return Number(a[columns]) - Number(b[columns]);
        }
        return Number(b[columns]) - Number(a[columns]);
      });
      return [...results, ...array];
    }
    return element;
  };

  useEffect(() => {
    setLeach([...planets]);
  }, [planets]);

  useEffect(() => {
    let leachs = filtered();
    leachs = orderPlanets(leachs);

    setLeach(leachs);
  }, [amount, filters, order]);

  const sentence = Object.keys(planets[0] || {});

  return (
    <div>
      <table data-testid="planets-table">
        <thead>
          <tr>
            {sentence.map((item, i) => <th key={ i }>{ capitalLetter(item) }</th>)}
          </tr>
        </thead>
        <tbody>
          {leach && leach.map((e, i) => (
            <tr key={ i }>
              {sentence.map((index) => ((e[index] === e.name)
                ? <td key={ index } data-testid="planet-name">{e[index]}</td>
                : <td key={ index }>{e[index]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
