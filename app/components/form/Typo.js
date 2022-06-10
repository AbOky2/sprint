import PropTypes from 'prop-types';
import { clsx } from '../../helpers/convertAndCheck';

const typoVariants = {
  h1: 'text-_28 sm:text-_34',
  h2: 'sm:text-5xl',
  h3: 'sm:text-_38',
  h4: 'sm:text-_28',
  h5: 'sm:text-lg',
  body1: 'sm:text-sm',
  body2: 'sm:text-sm font-normal',
};
const typoColors = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
};
export const TypoVariantsList = Object.keys(typoVariants);
export const TypoColorsList = Object.keys(typoColors);
export const Typo = ({ children, variant, label, color, className = '' }) => {
  const _variant = variant || 'body1';
  const _className = clsx(
    'font-bold leading-_110 mb-2',
    color && typoColors[color],
    typoVariants[_variant],
    className
  );
  const text = label || children;
  const Component = _variant.includes('body') ? 'p' : _variant;

  return <Component className={_className}>{text}</Component>;
  <div className="text-"></div>;
};
Typo.propTypes = {
  variant: PropTypes.oneOf(TypoVariantsList).isRequired,
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
