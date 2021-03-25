import { Typography } from '@material-ui/core';
import withStyles from './styles';

const Instruction = withStyles(({ classes }) => (
  <div className={classes.setpsContainer}>
    <Typography variant="h2" className={classes.title}>
      Mon premier achat en 5 étapes !
    </Typography>
    <Typography variant="body1" className={classes.subTitle}>
      Comment ça marche?
    </Typography>
    <ul>
      <li>
        <Typography variant="body1">
          <span>1</span>
          Je sélectionne l'appartement qui me convient avec l'aide d'un
          conseiller Kit Le Nid
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          <span>2</span>
          J'effectue la réservation du bien, qui est bloqué pour moi
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          <span>3</span>
          J'effectue les démarches de prêt immobilier ou la confie à Kit Le Nid
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          <span>4</span>
          Je signe chez le notaire et devient officiellement propriétaire
        </Typography>
      </li>
      <li>
        <Typography variant="body1">
          <span>5</span>
          J'attends la livraison du bien et emménage!
        </Typography>
      </li>
    </ul>
  </div>
));
export default Instruction;
