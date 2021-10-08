import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CreatableSelect from 'react-select/creatable';
import Upload from '../../form/Upload';

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
const Second = ({
  onChange,
  values = {},
  selectDefaultOptions,
  handleCustomSelectCreate,
}) => {
  const classes = useStyles();
  const handelSelect = (e) => {
    if (e?.__isNew__ && handleCustomSelectCreate) {
      handleCustomSelectCreate(e);
      onChange('type')(e.value);
    } else if (e) {
      onChange('type')(e.name);
    }
  };
  return (
    <>
      <div className="text-center">
        <span className="custom-upload-container">Logo</span>
        <Upload
          name="picture"
          value={values?.picture}
          onChange={onChange('picture')}
        />
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
          <CreatableSelect
            isClearable
            fullWidth
            onChange={handelSelect}
            defaultValue={{ name: values.type, label: values.type }}
            options={selectDefaultOptions}
          />
        </div>
      </div>
    </>
  );
};
export default Second;
