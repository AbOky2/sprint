const comodityDivider = 'comodity__';

const residenceLotsPropertiesHeader = new Array(21);
residenceLotsPropertiesHeader[1] = 'lot_ref';
residenceLotsPropertiesHeader[2] = 'residence_ref';
residenceLotsPropertiesHeader[3] = 'door';
residenceLotsPropertiesHeader[4] = 'typeOfProperty';
residenceLotsPropertiesHeader[5] = 'pieces';
residenceLotsPropertiesHeader[6] = 'surface';
residenceLotsPropertiesHeader[7] = 'floor';
residenceLotsPropertiesHeader[8] = 'price';
residenceLotsPropertiesHeader[9] = 'Honoraires';
residenceLotsPropertiesHeader[10] = 'guarantee';
// residenceLotsPropertiesHeader[11] = 'Redevance journalière';
residenceLotsPropertiesHeader[12] = 'available_date';
// residenceLotsPropertiesHeader[13] = 'Locataire contrat en cours';
// residenceLotsPropertiesHeader[14] = 'Date début contrat avenir';
// residenceLotsPropertiesHeader[15] = 'Locataire du contrat avenir';
// residenceLotsPropertiesHeader[16] = 'Motif non commercialisation';
// residenceLotsPropertiesHeader[17] = 'Conso énergie';
// residenceLotsPropertiesHeader[18] = 'Bilan énergie';
// residenceLotsPropertiesHeader[19] = 'Conso GES';
// residenceLotsPropertiesHeader[20] = 'Bilan GES';
// residenceLotsPropertiesHeader[21] = 'Copro règle';

const residencePropertiesHeader = new Array(305);
residencePropertiesHeader[1] = 'lot_ref';
residencePropertiesHeader[2] = 'heading';
residencePropertiesHeader[3] = 'address';
residencePropertiesHeader[5] = 'postal';
residencePropertiesHeader[6] = 'city';
residencePropertiesHeader[19] = `${comodityDivider}Point phone`;
residencePropertiesHeader[20] = `${comodityDivider}Cafétéria linge`;
residencePropertiesHeader[21] = `${comodityDivider}Intendant`;
residencePropertiesHeader[22] = `${comodityDivider}ALS`;
residencePropertiesHeader[23] = `${comodityDivider}Déjeuné`;
residencePropertiesHeader[24] = `${comodityDivider}Télévision`;
residencePropertiesHeader[25] = `${comodityDivider}Salle réunion`;
residencePropertiesHeader[26] = `${comodityDivider}Parking`;
residencePropertiesHeader[27] = `${comodityDivider}Piscine`;
residencePropertiesHeader[28] = `${comodityDivider}Linge maison`;
residencePropertiesHeader[29] = `${comodityDivider}Service ménage`;
residencePropertiesHeader[30] = `${comodityDivider}Photocopieuse`;
residencePropertiesHeader[31] = `${comodityDivider}Interphone`;
residencePropertiesHeader[32] = `${comodityDivider}Local deux roues`;
residencePropertiesHeader[33] = `${comodityDivider}Internet illimité offert`;
residencePropertiesHeader[35] = 'description';
residencePropertiesHeader[77] = `${comodityDivider}salle de sport`;
residencePropertiesHeader[78] = `${comodityDivider}location vaisselle`;
residencePropertiesHeader[79] = `${comodityDivider}Internet fibre optique offert`;
residencePropertiesHeader[80] = `${comodityDivider}Distributeur de boissons`;
residencePropertiesHeader[81] = `${comodityDivider}Vidéo Surveillance`;
residencePropertiesHeader[82] = `${comodityDivider}Distributeur Plats Chauds`;
residencePropertiesHeader[41] = 'picture_1';
residencePropertiesHeader[42] = 'picture_2';
residencePropertiesHeader[43] = 'picture_3';
residencePropertiesHeader[44] = 'picture_4';
residencePropertiesHeader[45] = 'picture_5';
residencePropertiesHeader[46] = 'picture_6';
residencePropertiesHeader[47] = 'picture_7';
residencePropertiesHeader[48] = 'picture_8';
residencePropertiesHeader[49] = 'picture_9';
residencePropertiesHeader[50] = 'picture_10';
residencePropertiesHeader[51] = 'picture_11';
residencePropertiesHeader[52] = 'picture_12';
residencePropertiesHeader[53] = 'picture_13';
residencePropertiesHeader[54] = 'picture_14';
residencePropertiesHeader[55] = 'picture_15';
residencePropertiesHeader[56] = 'picture_16';
residencePropertiesHeader[57] = 'picture_17';
residencePropertiesHeader[58] = 'picture_18';
residencePropertiesHeader[59] = 'picture_19';
residencePropertiesHeader[60] = 'picture_20';
residencePropertiesHeader[108] = `${comodityDivider}Autopartage`;
residencePropertiesHeader[109] = `${comodityDivider}Accès Internet (Wifi)`;
residencePropertiesHeader[111] = `${comodityDivider}Accueil (Gouvernant)`;
residencePropertiesHeader[112] = `${comodityDivider}Salle Activité`;
residencePropertiesHeader[113] = `${comodityDivider}Salon Tisanerie`;
residencePropertiesHeader[114] = `${comodityDivider}Téléassistance`;
residencePropertiesHeader[115] = `${comodityDivider}Portage Repas à domicile`;
residencePropertiesHeader[116] = `${comodityDivider}Aide-Ménagère`;
residencePropertiesHeader[117] = `${comodityDivider}Accompagnement (non) véhiculé`;
residencePropertiesHeader[118] = `${comodityDivider}Livraison Course Aide rangement`;
residencePropertiesHeader[119] = `${comodityDivider}Préparation des repas`;
residencePropertiesHeader[120] = `${comodityDivider}Aide Hygiène Corporel`;
residencePropertiesHeader[121] = `${comodityDivider}Stimulation Compagnie Jeux`;
residencePropertiesHeader[122] = `${comodityDivider}Garde malade`;
residencePropertiesHeader[123] = `${comodityDivider}Dépannage Petits Bricolages`;
residencePropertiesHeader[124] = `${comodityDivider}Travaux de Jardinage`;
residencePropertiesHeader[125] = `${comodityDivider}Coiffure`;
residencePropertiesHeader[126] = `${comodityDivider}Assistance Informatique et Internet`;
residencePropertiesHeader[127] = `${comodityDivider}Livraison des courses`;
residencePropertiesHeader[128] = `${comodityDivider}Livraison des médicaments`;
residencePropertiesHeader[129] = `${comodityDivider}Aide au logement`;
residencePropertiesHeader[130] = `${comodityDivider}Défiscalisation`;

const propertiesHeader = new Array(305);
propertiesHeader[3] = 'typeOfAnnonce';
propertiesHeader[4] = 'typeOfProperty';
propertiesHeader[5] = 'postal';
propertiesHeader[6] = 'city';
propertiesHeader[7] = 'country';
propertiesHeader[8] = 'address';
propertiesHeader[11] = 'price';
propertiesHeader[16] = 's';
propertiesHeader[17] = 'land_surface';
propertiesHeader[18] = 'nb_pieces';
propertiesHeader[19] = 'nb_rooms';
propertiesHeader[20] = 'heading';
propertiesHeader[21] = 'description';
propertiesHeader[22] = 'available_date';
propertiesHeader[24] = 'floor';
propertiesHeader[27] = 'renew';
propertiesHeader[35] = 'south_orientation';
propertiesHeader[36] = 'east_orientation';
propertiesHeader[37] = 'west_orientation';
propertiesHeader[38] = 'north_orientation';
propertiesHeader[39] = 'balcony';
propertiesHeader[45] = 'digicode';
propertiesHeader[46] = 'intercom';
propertiesHeader[47] = 'guardian';
propertiesHeader[48] = 'terrace';
propertiesHeader[85] = 'picture_1';
propertiesHeader[86] = 'picture_2';
propertiesHeader[87] = 'picture_3';
propertiesHeader[88] = 'picture_4';
propertiesHeader[89] = 'picture_5';
propertiesHeader[90] = 'picture_6';
propertiesHeader[91] = 'picture_7';
propertiesHeader[92] = 'picture_8';
propertiesHeader[93] = 'picture_9';
propertiesHeader[137] = 'isNewProperty';
propertiesHeader[164] = 'picture_10';
propertiesHeader[165] = 'picture_11';
propertiesHeader[166] = 'picture_12';
propertiesHeader[167] = 'picture_13';
propertiesHeader[168] = 'picture_14';
propertiesHeader[169] = 'picture_15';
propertiesHeader[170] = 'picture_16';
propertiesHeader[171] = 'picture_17';
propertiesHeader[172] = 'picture_18';
propertiesHeader[173] = 'picture_19';
propertiesHeader[174] = 'picture_20';
propertiesHeader[175] = 'lot_ref';
propertiesHeader[193] = 'transport_lines';
propertiesHeader[194] = 'stations';
propertiesHeader[298] = 'lat';
propertiesHeader[299] = 'lng';
const availableProperties = {
  typeOfAnnonce: "Type d'annonce",
  typeOfProperty: 'Type de propriété',
  price: 'Prix',
  isNewProperty: 'isNewProperty',
  renew: 'renew',
  surface: 'Surface', //
  land_surface: 'Surface terrain', //
  nb_pieces: 'Nombre de pieces', //
  nb_rooms: 'Nombre de rooms',
  expenses: 'Dépenses',
  floor: 'Étage',
  south_orientation: 'sud',
  east_orientation: 'est',
  west_orientation: 'ouest',
  north_orientation: 'nord',
  balcony: 'Balcon',
  nb_floors: "Nombre d'étage",
  nb_bathrooms: 'Nombre de salles de bains',
  nb_washrooms: 'Nombre de toilettes',
  nb_wc: 'Nombre de wc',
  is_separate_wc: 'WC séparés',
  nb_balcony: 'Nombre de balcon',
  elevator: 'ascenseur',
  nb_parking: 'Nombre de parking',
  digicode: 'Digicode',
  intercom: 'Intercom',
  lot_ref: 'identifiant technique', //
  postal: 'Code postal',
  city: 'Ville', //
  country: 'Pays', //
  address: 'Adresse', //
  district: 'Quartier',
  heading: 'Rubrique', //
  description: 'Description', //
  available_date: 'Date de disponibilité', //
  guardian: 'Gardien',
  terrace: 'Terrasse',
  phone: 'Téléphone',
  contact: 'Contacte',
  email: 'E-mail',
  transport_lines: 'lignes',
  stations: 'Stations',
  property_sub_type: 'Sous type de bien',
  file: 'fichier',
  lat: 'latitude',
  lng: 'longitude',
  // 'comodity__Point phone': '',
  // 'comodity__Cafétéria linge': '',
  // comodity__Intendant: '',
  // comodity__ALS: '',
  // comodity__Déjeuné: '',
  // comodity__Télévision: '',
  // 'comodity__Salle réunion': '',
  // comodity__Parking: '',
  // comodity__Piscine: '',
  // 'comodity__Linge maison': '',
  // 'comodity__Service ménage': '',
  // comodity__Photocopieuse: '',
  // comodity__Interphone: '',
  // 'comodity__Local deux roues': '',
  // 'comodity__Internet illimité offert': '',
  // 'comodity__salle de sport': '',
  // 'comodity__location vaisselle': '',
  // 'comodity__Internet fibre optique offert': '',
  // 'comodity__Distributeur de boissons': '',
  // 'comodity__Vidéo Surveillance': '',
  // 'comodity__Distributeur Plats Chauds': '',
  // comodity__Autopartage: '',
  // 'comodity__Accès Internet (Wifi)': '',
  // 'comodity__Accueil (Gouvernant)': '',
  // 'comodity__Salle Activité': '',
  // 'comodity__Salon Tisanerie': '',
  // comodity__Téléassistance: '',
  // 'comodity__Portage Repas à domicile': '',
  // 'comodity__Aide-Ménagère': '',
  // 'comodity__Accompagnement (non) véhiculé': '',
  // 'comodity__Livraison Course Aide rangement': '',
  // 'comodity__Préparation des repas': '',
  // 'comodity__Aide Hygiène Corporel': '',
  // 'comodity__Stimulation Compagnie Jeux': '',
  // 'comodity__Garde malade': '',
  // 'comodity__Dépannage Petits Bricolages': '',
  // 'comodity__Travaux de Jardinage': '',
  // comodity__Coiffure: '',
  // 'comodity__Assistance Informatique et Internet': '',
  // 'comodity__Livraison des courses': '',
  // 'comodity__Livraison des médicaments': '',
  // 'comodity__Aide au logement': '',
  // comodity__Défiscalisation: '',
};

const filteredProperties = Object.keys(availableProperties);
const typeOfAnnoncies = ['Vente', 'Location'];
const typeOfProperties = [
  'Appartement',
  'bâtiment',
  'boutique',
  'bureaux',
  'château',
  'inconnu',
  'hôtel particulier',
  'immeuble',
  'local',
  'loft/atelier/surface',
  'maison/villa',
  'parking/box',
  'terrain',
];
module.exports = {
  residencePropertiesHeader,
  residenceLotsPropertiesHeader,
  propertiesHeader,
  filteredProperties,
  typeOfAnnoncies,
  typeOfProperties,
  comodityDivider,
};
