import PropTypes from 'prop-types';
import { clsx } from '../../helpers/convertAndCheck';

/**
    font-family: 'Space Grotesk';
    font-style: normal;
    font-weight: 700;
    font-size: 68px;
    line-height: 110%;
    color: #000000;
 */
const typoTypes = {
  h1: 'text-_68 font-bold leading-_110',
  h2: 'text-5xl font-bold leading-_110',
  h3: 'text-_38 font-bold leading-_110',
  h4: 'text-_28 font-bold leading-_110',
  h5: 'text-lg font-bold leading-_110',
  body1: 'text-sm font-bold leading-_110',
  body2: 'text-sm font-normal leading-_110',
};
export const TypoTypesList = Object.keys(typoTypes);
export const Typo = ({ children, type, label, className = '' }) => {
  const _type = type || 'body1';
  const _className = clsx(typoTypes[_type], className);
  const text = label || children;
  const Component = _type.includes('body') ? 'p' : _type;

  return <Component className={_className}>{text}</Component>;
  <div className="text- font-normal leading-_110" />;
};
Typo.propTypes = {
  type: PropTypes.oneOf(TypoTypesList).isRequired,
  children: PropTypes.node,
  label: PropTypes.string,
  className: PropTypes.string,
};
Typo.defaultProps = {
  label: '',
  className: '',
};
