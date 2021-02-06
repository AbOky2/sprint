const Admin = 'admin';
const Roomer = 'roomer';
const Buyer = 'buyer';
const Student = 'student';
const studentRoleList = [Roomer, Buyer];
const RoleList = [Admin, ...studentRoleList];

// status
const Active = 'active';
const Inactive = 'inactive';
const StatusList = [Active, Inactive];

// Methods
const isAdmin = (user) => user && user.role === Admin;
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

module.exports = {
  // Vars
  Admin,
  Student,
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

  // Methods
  isAdmin,
  isStudent,
  isBuyer,
  generateSlug,
  isRoomer,
};
