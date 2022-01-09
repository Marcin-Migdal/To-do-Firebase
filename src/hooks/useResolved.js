import { useEffect, useState } from 'react';

export const useResolved = (...values) => {
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    setResolved(values.every(v => v !== undefined));
  }, [...values]);

  return resolved;
};
