const propertiesHeader = new Array(305);
propertiesHeader[3] = 'typeOfAnnonce';
propertiesHeader[4] = 'typeOfProperty';
propertiesHeader[5] = 'postal';
propertiesHeader[6] = 'city';
propertiesHeader[7] = 'country';
propertiesHeader[8] = 'address';
propertiesHeader[11] = 'price';
propertiesHeader[16] = 'surface';
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
  propertiesHeader,
  filteredProperties,
  typeOfAnnoncies,
  typeOfProperties,
};
