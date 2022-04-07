import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import withAuth from 'lib/withAuth';
import { AdminContentWrapper } from 'components/wrapper';
import { Btn, Icon } from 'components';
import { isYoungWorker, ucfirst } from 'helpers';
import { getPartnersApiMethod } from 'lib/api/customer';
import LocationImg from 'static/img/location.png';
import HouseImg from 'static/img/house.png';
import LogoImg from 'static/img/logo.png';
import { pageLink } from 'constants/index';
import signIn from 'next-auth/react'

const styles = (theme) => ({
  container: {
    padding: '2.4rem',
    margin: '1.6rem 0 3.2rem',
    backgroundColor: 'white',
    boxShadow: '0px 4px 20px rgb(24 55 50 / 4%)',
    borderRadius: '25px',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      padding: '2.5rem ',
    },
  },
  presentationContainer: {
    '& > div:first-of-type': {
      paddingRight: '1.5rem',
    },
    '& > div:last-of-type': {
      paddingLeft: '1.5rem',
    },
    '& > div:first-of-type > div': {
      height: '100%',
    },
    '& > div:first-of-type > div > a': {
      height: '100%',
      background: 'linear-gradient(99.78deg, #CC95DF -24.64%, #4F80FF 62.6%)',
      boxShadow:
        '0px 6px 15px rgba(79, 128, 255, 0.3), inset 0px -3px 10px rgba(12, 37, 100, 0.3)',
    },
    '& > div:last-of-type > div': {
      height: '100%',
      boxShadow:
        '0px 4px 13px rgba(0, 0, 0, 0.1), inset 0px -3px 10px rgba(149, 149, 149, 0.2)',
    },
    '& > div > div > a > img': {
      width: 77,
    },
    '& > div > div > a > svg': {
      width: 'auto!important',
      height: 'auto!important',
    },
    '& > div > div > a': {
      ...theme.ui.bordered,
      display: 'block',
      position: 'relative',
      height: '100%',
      padding: 32,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    '& > div > div div svg': {
      position: 'absolute',
      bottom: 16,
      right: 16,
    },
    [theme.breakpoints.down('sm')]: {
      '& > div:first-of-type': {
        marginBottom: '2rem',
      },
      '& > div:first-of-type, & > div:last-of-type': {
        padding: 0,
        width: '100%',
      },
    },
  },
  heading: {
    '& > div': {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '3rem',
      textAlign: 'center',
      '& > div': {
        display: 'block',
        marginBottom: 15,
      },
      '& img': {
        height: 50,
        display: 'inline-block',
        width: 'auto',
      },
    },
  },
  welcomeSub: {
    color:"#849CD9",
    display: 'block',
    fontSize: '18px',
    fontWeight: 'Regular',
    lineHeight: '3.5rem',
  },
  subTitle: {
    margin: '.4rem 0 2.2rem',
  },
  customH2: {
    fontFamily: theme.typography.secondFontFamily,
    fontWeight: 'bold',
  },

  nouveauH2:{
    fontWeight:"bold",
    fontSize:"22px",
    lineHeight:"23px",
    color:"#1A2E6C",

  },
  nouveauGrid:{
    display:"flex", flexDirection:"row-reverse", marginBottom:"16px"
  },
  gridPoints:{
    background:'white', width:"100%", borderRadius:"12px", border:"1px solid #EAEFFA", padding:"24px", marginBottom:"16px"

  },
  numeroPoints:{
    background:'rgba(248, 191, 44, 1)', width:'34px', heigth:"44px", borderRadius:"50%", padding:"12px", marginBottom:"10px"
  },
  presentationCardTitle: {
    color: theme.palette.newBlue,
    margin: '1.6rem 0 .5rem',
  },
  buyText: {
    color: '#526190',
  },
  partnerDescription: {
    margin: '.4rem 0 2rem',
  },
  partnerListContainer: {
    width: '33.33%',
    '& > a': {
      display: 'block',
      background: '#ffffff',
      ...theme.ui.bordered,
      border: `1px solid ${theme.palette.lightBlue}`,
      padding: '2rem',
      marginBottom: '2rem',
    },
    ...theme.ui.listContainer,
  },
  whiteColor: {
    color: 'white',
  },
  partnerListImgContainer: {
    height: 70,
    marginTop: '3rem',
    textAlign: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  partnerCardType: {
    display: 'inline-block',
    padding: '.8rem 1.4rem',
    borderRadius: '9px',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: '16px',
    color: '#BE8B07',
    background: 'rgba(248, 191, 44, 0.2)',
    margin: '1rem 0 1.6rem',
  },
  partnerCardTitle: {
    marginBottom: '.8rem',
    color: '#4F80FF',
  },
  partnerListTextContainer: {
    position: 'relative',
    width: '100%',
    '& > p': {
      width: 'calc(100% - 3rem)',
      margin: 0,
      ...theme.typography.body1,
      color: '#6976A0',
      height: '6.5rem',
      overflow: 'hidden',
    },
    '& p': {
      margin: 0,
    },
    '& > svg': {
      position: 'absolute',
      bottom: '0',
      right: '0',
      transform: 'translateY(.5rem)',
    },
  },
});

const Dashboard = ({ user = {}, partners, classes }) => (
  <AdminContentWrapper noRedirect>
    <div className={classes.heading} style={{marginBottom:"33px"}}>
      <div>
        <img src={'static/img/logo-full.png'} alt="" />
      
      </div>
      <Typography variant="h1" style={{color: "#113EB6", fontWeight:"bold", lineHeight:"28px"}}>
      Devenir propriétaire devient &nbsp;
        <span style={{color:"#3679FF"}}>
         plus accessible.
        </span>
        <span onClick={signIn} className={classes.welcomeSub}>
          Bienvenue sur votre espace personnel Kit le Nid.
        </span>
      </Typography>
    </div>

    <div style={{border: "2px solid #EFF4FF", background:"white", width:"80%", height:"55px", borderRadius:"12px", position:"absolute", marginTop:"2px", marginLeft:"22px", display:"flex", flexDirection:"row-reverse"}}>
      <div style={{background:"linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)", width:'39px', height:"39px", borderRadius:"12px", padding:"7px", marginTop:"7px", marginRight:"9px"}}>
      <Icon 
      type='recherche'
      color='white'
      /></div>

    </div>
    <img src={'static/img/maison.jpg'} alt="" style={{marginTop:"22px", width:"100%"}} />

 
    <Typography variant="h2" style={{color:"rgba(26, 46, 108, 1)", fontWeight:"bold", fontSize:"18px", textAlign:"center", marginTop:"16px"}}>
      L’achat dans une résidence neuve avec Kit le nid <span className={classes.welcomeSub} style={{textAlign:"center", fontSize:"14px", lineHeight:"18px"}}>
    Construire son projet immobilier avec Kit le nid c’est bénéficier : 
     </span>
    </Typography>
    

    
    <Grid container style={{marginTop:"23px"}} spacing={4}>
      <Grid item className={classes.nouveauGrid}>
        <Typography className={classes.nouveauH2} style={{marginLeft:"16px"}}>
          Des logements neufs dans toutes la France
          <span className={classes.welcomeSub} style={{fontSize:"14px", lineHeight:"18px",  marginTop:"6px"}}>
          Plus de 3 000 logements neufs disponibles.    
           </span>
        </Typography>
       <div style={{background:"rgba(220, 230, 255, 1)", borderRadius:"50%", width:"53px", heigth:"53px", padding:"13px"}}>
         <Icon
         type='item1'
         noColor
          /></div>
      </Grid>

      <Grid item className={classes.nouveauGrid}>
        <Typography className={classes.nouveauH2} style={{marginLeft:"16px"}}>
        Parcours 100% gratuit
        <span className={classes.welcomeSub} style={{fontSize:"14px", lineHeight:"18px",  marginTop:"6px"}}>
        Un parcours simplifié pour votre premier achat sans frais d’agence, ni frais de dossier.
         </span>
        </Typography>
        <div style={{background:"rgba(254, 242, 213, 1)", borderRadius:"50%", width:"53px", heigth:"53px",  padding:"12px"}}>
         <Icon
         type='item2'
         noColor
          /></div>

      </Grid>


      <Grid item className={classes.nouveauGrid}>
        <Typography className={classes.nouveauH2} style={{marginLeft:"16px"}}>
        Accompagnement
        <span className={classes.welcomeSub} style={{fontSize:"13px", lineHeight:"18px", marginTop:"6px"}}>
        Un accompagnement personnalisé avec un unique conseiller, pour les étudiants et les jeunes actifs.         </span>
        </Typography>
        <div style={{background:"rgba(245, 234, 249, 1)", borderRadius:"50%", width:"53px", heigth:"53px",  padding:"12px"}}>
         <Icon
         type='item3'
         noColor
          /></div>

      </Grid>


      <Grid item className={classes.nouveauGrid} style={{marginBottom:"27px"}}>
        <Typography className={classes.nouveauH2} style={{marginLeft:"16px"}}>
        Accès libre aux plans
        <span className={classes.welcomeSub} style={{ fontSize:"14px", lineHeight:"18px",  marginTop:"6px"}}>
        Tous les plans des appartements sont téléchargeables sur notre plateforme.
         </span>
        </Typography>
        <div style={{background:"rgba(237, 248, 240, 1)", borderRadius:"50%", width:"53px", heigth:"53px", padding:"12px"}}>
         <Icon
         type='item4'
         noColor
          />
          </div>

      </Grid>

    </Grid>
   

   <Grid container>
     <Grid className={classes.gridPoints}>
       <div className={classes.numeroPoints}>

       <Icon
       type='numero1'
       noColor
       size=''
        />       </div>

       <Typography variant='h2' style={{fontSize:"18px", marginBottom:"8px"}}>
       Rejoignez la plateforme Kit le Nid
       </Typography>
       <Typography style={{color:"rgba(132, 156, 217, 1)", fontWeight:"bold"}}>
       Inscrivez-vous et développez votre projet avec nos conseillers.
       </Typography>
     </Grid>
   </Grid>

   <Grid container>
     <Grid className={classes.gridPoints}>
       <div className={classes.numeroPoints}>

       <Icon
       type='numero2'
       noColor
       size=''
        />       </div>

       <Typography variant='h2' style={{fontSize:"18px", marginBottom:"8px"}}>
       Sélectionnez votre logement
       </Typography>
       <Typography style={{color:"rgba(132, 156, 217, 1)", fontWeight:"bold"}}>
       Choisissez et réservez votre appartement en ligne.
       </Typography>
     </Grid>
   </Grid>

   <Grid container>
     <Grid className={classes.gridPoints}>
       <div className={classes.numeroPoints}>

       <Icon
       type='numero3'
       noColor
       size=''
        />       </div>

       <Typography variant='h2' style={{fontSize:"18px", marginBottom:"8px"}}>
       Profitez d’un financement simplifié
              </Typography>
       <Typography style={{color:"rgba(132, 156, 217, 1)", fontWeight:"bold"}}>
       Kit le nid vous accompagne dans toutes vos démarches de prêt.
       </Typography>
     </Grid>
   </Grid>


   <Grid container>
     <Grid className={classes.gridPoints}>
       <div className={classes.numeroPoints}>

       <Icon
       type='numero4'
       noColor
       size=''
        />       </div>

       <Typography variant='h2' style={{fontSize:"18px", marginBottom:"8px"}}>
       Personnalisez votre bien avec nos équipes
       </Typography>
       <Typography style={{color:"rgba(132, 156, 217, 1)", fontWeight:"bold"}}>
       Trouvez les meilleures solutions de décoration et d’aménagement pour votre appartement en attendant sa livraison.
       </Typography>
     </Grid>
   </Grid>


  </AdminContentWrapper>
);

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  partners: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
};

Dashboard.getInitialProps = async ({ req, res }) => {
  if (req && !req.user) {
    res.redirect(pageLink.home);
    return { partners: [] };
  }

  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }

  const { list } = await getPartnersApiMethod({ headers });
  return { partners: list };
};
const mapState = (state) => {
  const { user } = state?.authentication;
  return { user };
};
export default withAuth(withStyles(styles)(connect(mapState)(Dashboard)));
