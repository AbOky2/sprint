import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const labelDimension = { xs: 6, ms: 12 };
let className;
const defaultDimension = { xs: 12, ms: 12 };

const IconDisplay = ({ src, fullIcon, withGrayScaleIcon }) => (
  <div className={`${fullIcon ? 'fullIcon' : ''} ${withGrayScaleIcon ? 'withGrayScaleIcon' : ''}`}>
    <img src={src} className="elem-icon" alt="" />

    <style jsx>
      {`
        .fullIcon {
          width: 100%;
          padding: 5px;
        }
        .fullIcon img {
          display: block;
          width: 100%;
        }
        .withGrayScaleIcon img {
          filter: grayscale(1);
        }
      `}
    </style>
  </div>
);
const LableWrapper = ({
  value,
  label,
  labelPosition = '',
  icon,
  fullIcon,
  withGrayScaleIcon,
  ...props
}) => {
  if (labelPosition.includes && labelPosition.includes('top')) labelDimension.xs = 12;
  if (labelPosition.includes && labelPosition.includes('left')) className = 'text-left';
  // for all mobile
  // labelDimension.xs = 12

  return (
    <Grid container justify="space-between" alignItems="center" alignContent="center">
      <Grid item {...labelDimension} className={`label-container ${className}`}>
        {icon && (
          <IconDisplay
            src={icon}
            fullIcon={fullIcon}
            withGrayScaleIcon={withGrayScaleIcon && !value}
          />
        )}
        <span className="form-label-container" style={{ ...props.labelStyle }}>
          {label}
        </span>
      </Grid>
      <Grid item {...labelDimension}>
        {props.children}
      </Grid>
    </Grid>
  );
};

const FormElementWrapper = ({
  value,
  showLabel = false,
  icon,
  fullIcon,
  withGrayScaleIcon,
  ...props
}) => {
  if (showLabel) return <LableWrapper {...props} icon={icon} />;

  return (
    <Grid item container alignItems="center" justify="space-between" {...defaultDimension}>
      {icon && (
        <Grid item xs={1}>
          {icon && (
            <IconDisplay
              src={icon}
              fullIcon={fullIcon}
              withGrayScaleIcon={withGrayScaleIcon && !value}
            />
          )}
        </Grid>
      )}

      <Grid item xs={icon ? 11 : 12} className={icon ? 'input-icon-wrapper' : ''}>
        {props.children}
      </Grid>
    </Grid>
  );
};

FormElementWrapper.propTypes = {
  showLabel: PropTypes.bool,
  label: PropTypes.string,
};

export { FormElementWrapper };
