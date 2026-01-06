
import { UserData } from '../types';

export const downloadVCard = (user: UserData) => {
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${user.fullName}
ORG:${user.company}
TITLE:${user.designation}
TEL;TYPE=CELL:${user.phone}
EMAIL;TYPE=WORK:${user.email}
URL:${user.socials.website || ''}
NOTE:${user.tagline}
END:VCARD`;

  const blob = new Blob([vCard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${user.fullName.replace(/\s+/g, '_')}_contact.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
