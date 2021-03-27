import React from 'react';
import { toast } from 'react-toastify';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Icon } from 'components/form';
import { ucfirst, stripTags } from 'helpers/convertAndCheck';
import copy from 'copy-to-clipboard';
import styles from './styles';

const Copy = ({ data }) => (
  <Grid
    container
    item
    onClick={() => {
      copy(stripTags(data));
      toast.dismiss();
      toast.success('Copié');
    }}
  >
    <Icon type="copy" color="iconBlue" />
    Copier
  </Grid>
);

const useStyles = makeStyles(styles);
const ReserveLocation = ({
  user,
  className,
  curr,
  residenceName,
  fullAddress,
  handleClose,
}) => {
  const classes = useStyles();
  const receiver = 'resa-tudea@nexity.fr';
  const subject = `Kit le nid - demande location (<strong> référence ${curr?.ref}</strong> )`;
  const message = `Bonjour,
  <br/><br/>
  Je me permets de vous contacter car je suis intéressé(e) par la location de la chambre étudiante dont la référence est <strong>${
    curr?.ref
  }</strong>, au sein de la résidence <strong>${ucfirst(
    residenceName
  )}</strong>  située à <strong>${fullAddress}</strong> , à compter du (../../..) et pour une durée de ... .
  <br/><br/>
  Je reste à votre entière disposition pour échanger avec vous et vous transmettre les éléments nécessaires à mon dossier.
  Vous pouvez me joindre sur mon portable au <strong>${
    user?.phone || '...'
  }</strong>,
  <br/><br/>
  Bien cordialement,
  <br/>
  ${ucfirst(user.firstName)}`;
  const datas = [
    { label: 'Destinataire', data: receiver },
    { label: 'Object', data: subject },
    { label: 'Message', data: message },
  ];
  return (
    <div>
      <Modal
        openModal={curr}
        showActions={false}
        onClose={handleClose}
        title="Votre demande de location à compléter et à envoyer à :RESA-STUDEA@nexity.fr"
        confirmText="Envoyer"
      >
        <Grid
          container
          item
          justify="center"
          className="form-container"
          className={className}
        >
          <Grid container item className={classes.mail}>
            {datas.map(({ label, data }, key) => (
              <Grid key={key} container item xs={12}>
                <Grid item xs={12} md={2}>
                  <Typography variant="h4">{label}</Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  md={8}
                  dangerouslySetInnerHTML={{ __html: data }}
                ></Grid>
                <Grid container item xs={4} md={2}>
                  <Copy data={data} />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};
export default ReserveLocation;
