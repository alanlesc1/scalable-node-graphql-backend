export const serverInternalErrorMessage = "Internal server error";
export const invalidEmailPasswordMessage = "Invalid email/password";
export const userIsAlreadyVerifiedMessage = "User is already verified";
export const verificationCodeWasGeneratedMessage = "Verification code not generated yet";
export const notAVerifiedUserMessage = "Not a verified user";
export const notAuthenticatedMessage = "Not authenticated";

export class Result { }
export class Error extends Result { }
export class ServerInternalError extends Error { }
export class SignUpResultSuccess extends Result { }
export class SignUpResultError extends Error { }
export class UserVerificationResultSuccess extends Result { }
export class UserVerificationResultError extends Error { }
export class LoginResultSuccess extends Result { }
export class LoginResultError extends Error { }
export class NotAuthenticatedError extends Error { }

// Factory for error/success resolvers returns 
export class ResultsFactory {
    static create(args) {
        const { type } = args;
        switch (type) {
            case Error:
                {
                    const error = new Error();
                    const { message } = args;
                    error.message = message ? message : serverInternalErrorMessage;
                    return {
                        __typename: "Error",
                        ...error
                    };
                }
            case SignUpResultSuccess:
                {
                    const signUpResultSuccess = new SignUpResultSuccess();
                    const { user } = args;
                    signUpResultSuccess.user = { ...user.toJSON() };
                    return {
                        __typename: "SignUpResultSuccess",
                        ...signUpResultSuccess
                    };
                }
            case SignUpResultError:
                {
                    const signUpResultError = new SignUpResultError();
                    const { message } = args;
                    signUpResultError.message = message ? message : serverInternalErrorMessage;
                    return {
                        __typename: "SignUpResultError",
                        ...signUpResultError
                    };
                }
            case UserVerificationResultSuccess:
                {
                    const userVerificationResultSuccess = new UserVerificationResultSuccess();
                    const { user } = args;
                    userVerificationResultSuccess.user = { ...user.toJSON() };
                    return {
                        __typename: "UserVerificationResultSuccess",
                        ...userVerificationResultSuccess
                    };
                }
            case UserVerificationResultError:
                {
                    const userVerificationResultError = new UserVerificationResultError();
                    const { message } = args;
                    userVerificationResultError.message = message ? message : serverInternalErrorMessage;
                    return {
                        __typename: "UserVerificationResultError",
                        ...userVerificationResultError
                    };
                }
            case LoginResultSuccess:
                {
                    const loginResultSuccess = new LoginResultSuccess();
                    const { token, user } = args;
                    loginResultSuccess.token = token;
                    loginResultSuccess.user = { ...user.toJSON() };
                    return {
                        __typename: "LoginResultSuccess",
                        ...loginResultSuccess
                    };
                }
            case LoginResultError:
                {
                    const loginResultError = new LoginResultError();
                    const { message } = args;
                    loginResultError.message = message ? message : serverInternalErrorMessage;
                    return {
                        __typename: "LoginResultError",
                        ...loginResultError
                    };
                }
            case NotAuthenticatedError:
                {
                    const notAuthenticatedError = new NotAuthenticatedError();
                    notAuthenticatedError.message = notAuthenticatedMessage;
                    return {
                        __typename: "NotAuthenticatedError",
                        ...notAuthenticatedError
                    };
                }
            default:
                throw Error('Type not supported');
        }
    }
}
