export interface AuthContextType {
    token: { jwt: string };
    signin: (email: string, password: string, callback: VoidFunction) => any;
    signup: (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      passwordConfirmation: string,
      callback: VoidFunction
    ) => any;
    signout: (callback: VoidFunction) => void;
  }