import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const defaultNodeame = 'SPAN';
const useToggleOpen = ({ nodeName = defaultNodeame, isOpen = false } = {}) => {
  const [open, setOpen] = useState(isOpen);
  const node = useRef();

  const toggleOpen = (e) => {
    if (
      node.current.contains(e.target) &&
      open &&
      e.target.nodeName === nodeName
    )
      setOpen(false);
    else if (node.current.contains(e.target) && !open) setOpen(true);
    else if (!node.current.contains(e.target)) setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', toggleOpen);
    return () => document.removeEventListener('mousedown', toggleOpen);
  }, [open]);

  return [node, open, toggleOpen];
};

useToggleOpen.propTypes = {
  nodeName: PropTypes.string,
  isOpen: PropTypes.bool,
};
useToggleOpen.defaultProps = {
  nodeName: defaultNodeame,
  isOpen: false,
};

const cleanAlert = (msg, type = 'warn') => {
  toast.dismiss();
  if (toast[type]) return toast[type](msg);
};

const toasifyType = ['warn', 'info', 'success', 'error', 'dark'];
cleanAlert.propTypes = {
  msg: PropTypes.string.isRequired,
  type: PropTypes.oneOf(toasifyType),
};
cleanAlert.defaultProps = {
  type: 'warn',
};
export { useToggleOpen, cleanAlert };
