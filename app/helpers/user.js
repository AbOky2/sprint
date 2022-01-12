const Admin = 'admin';
const Roomer = 'roomer';
const Buyer = 'buyer';
const Student = 'student';
const YoungGraduate = 'young_graduate';
const EndOfStudies = 'end_of_studies';
const studentRoleList = [Student, Buyer, YoungGraduate, EndOfStudies];
const RoleList = [Admin, ...studentRoleList];

// status
const Active = 'active';
const Inactive = 'inactive';
const StatusList = [Active, Inactive];

// Methods
const isAdmin = (user) => user && user.role === Admin;
const isYoungWorker = (user) =>
  user && [Buyer, YoungGraduate].includes(user.role);
const isStudent = (user) => user && studentRoleList.includes(user.role);
const isBuyer = (user) => user && user.role === Buyer;
const isRoomer = (user) => user && user.role === Roomer;

// Other
const buyStrategy = 'buy';
const locationStrategy = 'location';
const guarantorStrategy = 'guarantor';
const strategyTypeKeys = {
  [buyStrategy]: 'Achat',
  [locationStrategy]: 'Location',
  [guarantorStrategy]: 'garant',
};
const dashboardPaths = {
  admin: '/admin',
  student: '/dashboard',
};

const userRoleSelect = [
  { name: 'Jeune actif', value: Buyer },
  { name: "En recherche d'emploi", value: YoungGraduate },
  { name: "Etudiant en dernière année", value: EndOfStudies },
  { name: 'Etudiant', value: Student },
];

const profileRequiredFields = [
  'email',
  'firstName',
  'lastName',
  'phone',
  'role',
];

// Slug
const slugify = (slug) => {
  let str = slug;

  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();

  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';

  for (let i = 0, l = from.length; i < l; i += 1)
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));

  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return str;
};

const createUniqueSlug = async (Model, slug, count) => {
  const user = await Model.findOne({ slug: `${slug}-${count}` }, 'id');

  if (!user) return `${slug}-${count}`;

  return createUniqueSlug(Model, slug, count + 1);
};

const generateSlug = async (Model, name, filter = {}) => {
  const origSlug = slugify(name);

  const user = await Model.findOne({ slug: origSlug, ...filter }, 'id');

  if (!user) {
    return origSlug;
  }

  return createUniqueSlug(Model, origSlug, 1);
};
const isValidateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const userRoleKeyVal = userRoleSelect.reduce((acc, curr) => {
  acc[curr.value] = curr.name;
  return acc;
}, {});

module.exports = {
  // Vars
  Admin,
  Student,
  Buyer,
  Roomer,
  Active,
  Inactive,
  RoleList,
  StatusList,
  studentRoleList,
  strategyTypeKeys,
  buyStrategy,
  locationStrategy,
  guarantorStrategy,
  dashboardPaths,
  userRoleSelect,
  profileRequiredFields,
  userRoleKeyVal,

  // Methods
  ucFirst,
  isValidateEmail,
  isAdmin,
  isStudent,
  isYoungWorker,
  isBuyer,
  generateSlug,
  isRoomer,
};
