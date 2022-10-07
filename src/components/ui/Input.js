import cx from 'classnames';

import { useCallback, useEffect, useState, useTransition } from 'react';

const CLASSNAMES_BY_SIZE = {
  xs: 'text-xs px-2 h-6 focus:ring-p-1 placeholder:text-xs',
  sm: 'text-sm px-3 h-8 focus:ring-p-1 placeholder:text-sm',
  md: 'text-md px-4 h-10 focus:ring-p-1 placeholder:text-sm',
  lg: 'text-lg px-4 h-12 focus:ring-p-2 placeholder:text-sm'
};

const Input = ({ afterChange, className, variant, size, ...props }) => {
  const [, startTransition] = useTransition();
  const [value, setValue] = useState('');

  const onChange = useCallback(event => {
    startTransition(() => {
      setValue(event.target.value);
    });
  }, []);

  useEffect(() => {
    afterChange(value);
  }, [value]);

  return (
    <input
      {...props}
      className={cx(
        'appearance-none w-full outline-none transition-all duration-100 rounded-full',
        'focus:outline-none text-black-900 placeholder:text-black-700 placeholder:font-semibold focus:border-th-highlight focus:ring-blue-500 focus:ring-4',
        CLASSNAMES_BY_SIZE[size],
        className
      )}
      onChange={onChange}
    />
  );
};

Input.defaultProps = {
  size: 'lg'
};

export default Input;
