import { User } from '../../../db/models';
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { jwtSecret } from '../../../../src/config/environment';
import { generateNewVerification, verifyCode } from '../../../helpers/userVerification';
import {
  ResultsFactory,
  SignUpResultSuccess,
  SignUpResultError,
  UserVerificationResultSuccess,
  UserVerificationResultError,
  LoginResultSuccess,
  LoginResultError,
  invalidEmailPasswordMessage,
  userIsAlreadyVerifiedMessage,
  verificationCodeWasGeneratedMessage,
  notAVerifiedUserMessage
} from '../../helpers/resultsFactory';
import { ValidationError } from 'sequelize';

const userMutations = {
  signUp: async (_, { name, email, password }) => {
    try {
      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      });

      return ResultsFactory.create({ type: SignUpResultSuccess, user: user });
    } catch (error) {
      if (error instanceof ValidationError)
        return ResultsFactory.create({ type: SignUpResultError, message: error.errors[0].message });
      else {
        console.error(error);
        return ResultsFactory.create({ type: SignUpResultError });
      }
    }
  },
  verifyUser: async (_, { email, password, verificationCode }) => {
    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        const valid = await bcrypt.compare(password, user.password);

        if (valid) {
          if (user.isUserVerified) {
            return ResultsFactory.create({ type: UserVerificationResultError, message: userIsAlreadyVerifiedMessage });
          }

          if (!user.verificationCode && verificationCode) {
            return ResultsFactory.create({ type: UserVerificationResultError, message: verificationCodeWasGeneratedMessage });
          }

          // Check for previously generated verification code
          if (verificationCode) {
            await verifyCode(user, verificationCode);
          }
          // Generate a new verification code
          else {
            await generateNewVerification(user);
          }

          await user.reload();
          return ResultsFactory.create({ type: UserVerificationResultSuccess, user: user });
        }
      }
    } catch (error) {
      if (error instanceof ValidationError)
        return ResultsFactory.create({ type: UserVerificationResultError, message: error.errors[0].message });
      else {
        console.error(error);
        return ResultsFactory.create({ type: UserVerificationResultError });
      }
    }

    return ResultsFactory.create({ type: UserVerificationResultError, message: invalidEmailPasswordMessage });
  },
  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        const valid = await bcrypt.compare(password, user.password);

        if (valid) {
          if (!user.isUserVerified) {
            return ResultsFactory.create({ type: LoginResultError, message: notAVerifiedUserMessage });
          }

          const token = jsonwebtoken.sign({ id: user.id, email: user.email }, jwtSecret, {
            expiresIn: "1d",
          });

          return ResultsFactory.create({ type: LoginResultSuccess, token: token, user: user });
        }
      }

      return ResultsFactory.create({ type: LoginResultError, message: invalidEmailPasswordMessage });
    } catch (error) {
      if (error instanceof ValidationError)
        return ResultsFactory.create({ type: LoginResultError, message: error.errors[0].message });
      else {
        console.error(error);
        return ResultsFactory.create({ type: LoginResultError });
      }
    }
  },
};

export default userMutations;
