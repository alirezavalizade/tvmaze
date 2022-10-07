import React from 'react';

import cx from 'classnames';

import { ReactComponent as LoadingIcon } from '@/theme/vectors/loading1.svg';

import Box from './Box';
import Icon from './Icon';

const DEFAULT_CLASSNAMES = [
  'inline-flex items-center align-middle select-none justify-center relative whitespace-nowrap leading-tight transition-all duration-200 outline-none appearance-none touch-manipulation font-semibold',
  'focus:outline-none ring:'
];

const VARIANT_CLASSNAMES = {
  info: ['bg-blue-500 text-white-900', 'focus:ring-white-900 focus:ring-2'],
  inverted: ['bg-white-900 text-black-900', 'focus:ring-black-900 focus:ring-2']
};

const CLASSNAMES_BY_SIZE = {
  xxs: 'text-xs h-4 x-2',
  xs: 'text-xs h-6 x-2',
  sm: 'text-sm h-8 px-7',
  md: 'text-md h-10 px-4',
  lg: 'text-lg h-12 px-6'
};

const LOADING_SIZE = {
  xxs: { width: '0.8em', height: '0.8em' },
  xs: { width: '1.1em', height: '1.1em' },
  sm: { width: '1.3em', height: '1.3em' },
  md: { width: '1.4em', height: '1.4em' },
  lg: { width: '1.8em', height: '1.8em' }
};

const LEFT_ICON_CLASSNAMES = 'inline-flex self-center mr-2';
const RIGHT_ICON_CLASSNAMES = 'inline-flex self-center ml-2';

const Button = ({
  className,
  variant,
  leftIcon,
  size,
  rightIcon,
  children,
  // IS CONDITIONS
  isRound,
  isLoading,
  isDisabled,
  ...props
}) => {
  const selectedVariant =
    typeof VARIANT_CLASSNAMES[variant] === 'function'
      ? VARIANT_CLASSNAMES[variant]({ isDisabled })
      : VARIANT_CLASSNAMES[variant];

  const classNames = cx(
    DEFAULT_CLASSNAMES,
    CLASSNAMES_BY_SIZE[size],
    selectedVariant,
    className,
    {
      'cursor-not-allowed': isDisabled,
      'rounded-full': isRound,
      'rounded-md': !isRound
    }
  );

  return (
    <Box
      as="button"
      className={classNames}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Icon>
          <LoadingIcon {...LOADING_SIZE[size]} />
        </Icon>
      ) : (
        <>
          {leftIcon && (
            <Box as="span" className={LEFT_ICON_CLASSNAMES}>
              <Icon>{leftIcon}</Icon>
            </Box>
          )}
          {children}
          {rightIcon && (
            <Box as="span" className={RIGHT_ICON_CLASSNAMES}>
              <Icon>{rightIcon}</Icon>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

Button.defaultProps = {
  size: 'md',
  variant: 'info',
  justify: 'center',
  leftIcon: null,
  rightIcon: null
};

export default Button;
