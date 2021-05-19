import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import SESMail from '@config/mail/SESMail';
import MailConfig from '@config/mail/Mail';

interface IRequest {
  email: string;
}
class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    if (MailConfig.driver === 'ses') {
      await SESMail.sendMail({
        to: {
          email: user.email,
          name: user.name,
        },
        subject: '[API Vendas] Recuperação de senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
          },
        },
      });
      return;
    }
    await EtherealMail.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      subject: '[API Vendas] Recuperacao de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
