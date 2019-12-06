import React, { FunctionComponent } from 'react';

import styles from './button.module.scss';

interface ButtonProps {
  type?: 'normal' | 'round';
  onClick?: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  type = 'normal',
  onClick
}) => (
  <button onClick={onClick} className={`${styles.button} ${styles[type]}`}>
    {children}
  </button>
);

export default Button;
