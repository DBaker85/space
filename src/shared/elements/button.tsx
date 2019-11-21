import React, { FunctionComponent } from 'react';

import styles from './button.module.scss';

interface ButtonProps {
  type?: 'normal' | 'round';
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  type = 'normal'
}) => (
  <button className={`${styles.button} ${styles[type]}`}>{children}</button>
);

export default Button;
