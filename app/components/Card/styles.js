import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    
    backgroundColor: 'red',
    padding: '34px',
    border: '1px solid #E2E2E2',
    marginBottom: '.8rem',
    gap:'22px',
    borderRadius: 12,
    objectFit:'containt',
    
    '& > div': {
      '&:first-of-type > div': {
        position: 'relative',
        backgroundSize: 'cover',
        borderRadius: 10,
        width: 110,
        height: 110,
      },
      '&:last-of-type': {
        position: 'relative',
        flex: '1 1 auto',
        '& > h3': {
          fontWeight: 800,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
        '& > p': {
          color: 'rgba(26, 46, 108, 0.75)',
          '&:nth-child(2)': {
            marginBottom: '.9rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            color: theme.palette.lighterGray,
          },
          '&:nth-child(3)': {
            color: theme.palette.blue,
          },
          '&:last-of-type': {
            color: theme.palette.blue,
            '& span': {
              color: theme.palette.lighterGray,
            },
          },
        },
        '& .like': {
          position: 'absolute',
          bottom: '.8rem',
          right: '.8rem',
          zIndex: 2,
        },
      },
    },
  },
  mapsContainer: {
    position: 'absolute',
    width: 200,
    zIndex: 7,
    top: 0,
    left: 0,
    transform: 'translate(-40%, calc(-100% - 1rem))',
    '& > a > div': {
      border: `1px solid ${theme.palette.lightGray}`,
      '& > div': {
        '&:first-of-type': {
          '& > div': {
            height: 150,
            borderRadius: '.8rem',
          },
        },
        '&:last-of-type': {
          '& p:last-of-type': {
            textAlign: 'left',
          },
        },
      },
    },
    '& > span': {
      position: 'absolute',
      top: 75,
      backgroundColor: 'white',
      borderRadius: '100%',
      padding: 5,
      '&:first-of-type': {
        left: 15,
      },
      '&:last-of-type': {
        right: 15,
      },
    },
  },
  mapsContainerBottomCard: {
    transform: 'translate(-40%, calc(15% - 1rem))',
  },
}));
export default useStyles;
