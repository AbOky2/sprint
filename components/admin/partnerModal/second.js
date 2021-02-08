import React from 'react';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Upload from '../../form/upload';
import { partnerTypes, partnerTypeListKeys } from '../../../helpers/partner';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(4),
  },
}));
const Second = ({ onChange, values = {} }) => {
  const classes = useStyles();
  return (
    <>
      <div className="text-center">
        <span className="custom-upload-conatainer">Logo</span>
        <Upload name="upload" value={values?.upload} onChange={onChange('upload')} />
      </div>
      <div>
        <span>Url</span>
        <TextField
          name="link"
          margin="none"
          value={values?.link}
          onChange={(e) => onChange('link')(e.target.value)}
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className={classes.divider}>
        <div className={classes.formControl}>
          <span>Type</span>
          <Select
            fullWidth
            value={values.type}
            // onChange={onChange}
            onChange={(e) => onChange('type')(e.target.value)}
            inputProps={{
              name: 'type',
              id: 'type-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            {partnerTypeListKeys.map((elem) => (
              <option key={elem} value={elem}>
                {partnerTypes[elem]}
              </option>
            ))}
            {/* <option value={20}>Twenty</option>
            <option value={30}>Thirty</option> */}
          </Select>
        </div>
      </div>
    </>
  );
};
export default Second;
