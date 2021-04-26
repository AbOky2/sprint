import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  mapWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  markerStyled: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '36px',
    height: '36px',
    fontSize: '14px',
    color: '#fff',
    border: '2px solid #fff',
    backgroundColor: '#fff',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  markerInGroupStyled: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '36px',
    height: '36px',
    marginLeft: '-7px',
    fontSize: '14px',
    color: '#fff',
    border: '2px solid #fff',
    backgroundColor: '#fff',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  markerPosition: {
    '& > div': {
      transform: (props) =>
        `translate(${props.isLeft ? '22%' : '-100%'}, calc(${
          props.isTop ? '-15%' : '-100%'
        } - 1rem))`,
    },
  },
  markerGroup: {
    display: 'flex',
    position: 'relative',
    width: '55px',
    background: '#fff',
    borderRadius: '100px',
    backgroundColor: '#fff',
  },
  markerCounter: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '36px',
    height: '36px',
    padding: '8px',
    marginLeft: '-10px',
    textAlign: 'center',
    fontSize: '.8rem',
    color: '#fff',
    border: '2px solid #fff',

    borderRadius: '50%',
    backgroundColor: 'gray',
  },
  markerIcon: {
    width: 50,
    position: 'absolute',
    zIndex: 6,
  },
});
export { styles };

export default withStyles(styles);
