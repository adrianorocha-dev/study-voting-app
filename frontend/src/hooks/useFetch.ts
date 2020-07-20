import { useState, useEffect } from 'react';

import api from '../services/api';

export default function useFetch<T>(url: string): [T | undefined, boolean] {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<T>(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return [data, loading];
}
