import { User } from '../../../db/models';
import {
  ResultsFactory,
  NotAuthenticatedError,
  Error
} from '../../helpers/resultsFactory';

const userQueries = {
  currentUser: async (_, args, { user }) => {
    if (user) {
      try {
        const userModel = await User.findOne({ where: { id: user.id } });
        return {
          __typename: "User",
          ...userModel.toJSON()
        };
      } catch (error) {
        console.error(error);
        return ResultsFactory.create({ type: Error });
      }
    } else {
      return ResultsFactory.create({ type: NotAuthenticatedError });
    }
  }
};

export default userQueries;
