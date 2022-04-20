import { useEffect, useState } from 'react';

export const useResolved = (...values) => {
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const _resolved = values.every(v => v !== undefined);
    resolved !== _resolved && setResolved(_resolved);
  }, [...values]);

  return resolved;
};
