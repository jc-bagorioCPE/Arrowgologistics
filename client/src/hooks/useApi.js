import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export function useApi(path) {
  const [state, setState] = useState({ data: null, error: null });
  useEffect(() => {
    let live = true;
    api(path).then(
      (data) => live && setState({ data, error: null }),
      (error) => live && setState({ data: null, error })
    );
    return () => { live = false; };
  }, [path]);
  return state;
}
