import PropTypes from 'prop-types';
import { clsx } from '../../helpers/convertAndCheck';

const typoTypes = {
  h1: 'text-_68 primary-text',
  h2: 'text-5xl',
  h3: 'text-_38',
  h4: 'text-_28',
  h5: 'text-lg',
  body1: 'text-sm',
  body2: 'text-sm font-normal',
};
const typoColors = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
};
export const TypoTypesList = Object.keys(typoTypes);
export const TypoColorsList = Object.keys(typoColors);
export const Typo = ({ children, type, label, color, className = '' }) => {
  const _type = type || 'body1';
  const _className = clsx(
    'font-bold leading-_110',
    color && typoColors[color],
    typoTypes[_type],
    className
  );
  const text = label || children;
  const Component = _type.includes('body') ? 'p' : _type;

  return <Component className={_className}>{text}</Component>;
};
Typo.propTypes = {
  type: PropTypes.oneOf(TypoTypesList).isRequired,
  color: PropTypes.oneOf(TypoColorsList),
  children: PropTypes.node,
  label: PropTypes.string,
  className: PropTypes.string,
};
Typo.defaultProps = {
  label: '',
  className: '',
  color: undefined,
};
