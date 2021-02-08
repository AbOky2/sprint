import React, { useState } from 'react';
import PropTypes from 'prop-types';
import defaultUserImage from '../../static/img/upload-image.png';
import { FormElementWrapper } from './formElement';

const UploadImageComp = ({ name, value, onChange, label, showLabel, props }) => {
  const [state, setState] = useState({
    imageUpdated: false,
    imagePreviewUrl: value || defaultUserImage,
  });
  const handlePreview = (file, cb) => {
    const reader = new FileReader();

    if (!file) return;

    reader.onloadend = () => {
      if (cb) cb(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    handlePreview(file, (base66) => {
      setState({ imagePreviewUrl: base66, imageUpdated: true });
      onChange && onChange(file);
    });
  };

  let { imagePreviewUrl, imageUpdated } = state;

  if (value && imageUpdated && typeof value === 'string') imagePreviewUrl = value;

  return (
    <FormElementWrapper label={label} showLabel={showLabel}>
      <div {...props}>
        <div className="upload inline-block relative">
          <img src={imagePreviewUrl} className="upload-src" alt="..." />
          <input type="file" name={name} onChange={(e) => handleImageChange(e)} />
        </div>
        {!showLabel && <h6 className="inline-block">{label}</h6>}
      </div>
    </FormElementWrapper>
  );
};

UploadImageComp.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  showLabel: PropTypes.bool,
  label: PropTypes.string,
};
export default UploadImageComp;
