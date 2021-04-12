const sgMail = require('@sendgrid/mail');
const {
  MAIL_USER,
  NEXT_PUBLIC_ROOT_URL,
  SENDGRID_API_KEY,
} = require('../../config');
const { ucfirst } = require('../../helpers/convertAndCheck');
sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * Send a mail
 * @param {Object} options
 * @param {String} options.to - Recipient
 * @param {String} options.subject - Subject
 * @param {String} options.content - HTML mail content
 */

const sendMail = async ({ to, subject, content, name = 'kit le nid' } = {}) =>
  // eslint-disable-next-line no-return-await
  await sgMail.send({
    from: { email: MAIL_USER, name },
    to,
    subject,
    html: content,
  });

const sendForgotPassword = async ({ token, to }) =>
  sendMail({
    to,
    subject: 'Mot de passe oublié',
    content: `Vous recevez cet e-mail car vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.
        Veuillez cliquer sur <a href='${`${NEXT_PUBLIC_ROOT_URL}/public/resetPassword?token=${token}`}'>ce lien</a> pour terminer la procédure:\n\n
        \n\n Si vous n'avez pas demandé cette opération, vous ne pouvez pas l'effectuer.
        Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé`,
  });

const sendSuccessResetPassword = async ({ email, to }) =>
  sendMail({
    to,
    subject: 'Votre mot de passe a été modifié',
    content: `Bonjour,\n\n
        Ceci est une confirmation que le mot de passe de votre compte ${email} vient d'être modifié.`,
  });

const sendNewLocation = async ({ subject, content }) =>
  sendMail({
    to: 'studea@email.com',
    subject,
    content,
  });

const sendSponsorship = async ({ sender, receiver }) =>
  sendMail({
    name: 'Kit le nid Parrainage',
    to: receiver.email,
    subject: 'Code parrainage',
    content: `Bonjour ${ucfirst(receiver.firstName)},\n\n
      ${ucfirst(sender.firstName)} ${ucfirst(
      sender.lastName
    )} vous a envoyé un code de parrainage: <a href='${`${NEXT_PUBLIC_ROOT_URL}/login?sponsorshipCode=${sender.slug}`}'>${
      sender.slug
    }</a>.
      `,
  });

const sucessSponsorshipUsed = async ({ sender, receiver }) =>
  sendMail({
    name: 'Kit le nid Parrainage',
    to: receiver.email,
    subject: 'Code parrainage',
    content: `Bonjour ${ucfirst(receiver.firstName)},\n\n
      Felicitations ! ${ucfirst(sender.firstName)} ${ucfirst(
      sender.lastName
    )} a utilisé votre code de parrainage :)
      `,
  });

module.exports = {
  sendMail,
  sendForgotPassword,
  sendSuccessResetPassword,
  sendNewLocation,
  sendSponsorship,
  sucessSponsorshipUsed,
};
