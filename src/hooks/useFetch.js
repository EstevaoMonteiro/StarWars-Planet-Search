import { useEffect, useState } from 'react';

function useFetch(endPoint) {
  const [data, setData] = useState();

  useEffect(() => {
    async function userFetch() {
      const response = await fetch(endPoint);
      const json = await response.json();
      setData(json.results);
    }
    userFetch();
  }, [endPoint]);

  return { data };
}

export default useFetch;
