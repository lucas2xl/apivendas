import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import MailConfig from '@config/mail/Mail';

import HandleBarsEmailTemplate, {
  IParseMailTemplate,
} from '@config/mail/HandleBarsEmailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandleBarsEmailTemplate();

    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });

    const { email, name } = MailConfig.defaults.from;

    await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}

export default EtherealMail;
