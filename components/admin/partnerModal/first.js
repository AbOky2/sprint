import React from 'react';
import TextField from '@material-ui/core/TextField';
import Upload from '../../form/upload';

const First = ({ onChange, values = {} }) => {
  console.log(values);
  return (
    <>
      <div className="text-center custom-upload-conatainer">
        <span>Photo de couverture</span>
        <Upload name="cover" value={values?.cover} onChange={onChange('cover')} />
      </div>
      <div>
        <TextField
          name="name"
          label="Nom"
          margin="none"
          value={values?.name}
          onChange={(e) => onChange('name')(e.target.value)}
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <br />
      <div>
        <TextField
          margin="none"
          name="description"
          label="Description"
          value={values?.description}
          onChange={(e) => onChange('description')(e.target.value)}
          required
          fullWidth
          inputProps={{ maxLength: 70 }}
        />
      </div>
    </>
  );
};

export default First;
