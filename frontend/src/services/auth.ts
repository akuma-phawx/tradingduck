export const signUp = async (userData: { email: string; name: string; password: string; confirmPassword: string }) => {
  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const user = await response.json();
    return user;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      console.log(error?.message);
    }
    return error;
  }
};

export const logIn = async (userData: { email: string; password: string }) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const user = await response.json();
    return user;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      console.log(error?.message);
    }
    return error;
  }
};

export const logOut = async () => {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const user = await response.json();
    return user;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      console.log(error?.message);
    }
    return error;
  }
};

export const amILoggedIn = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/amiloggedin');
    const user = await response.json();
    if (user.message === 'loggedIn') return true;
    return false;
  } catch (error) {
    return false;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await fetch('/api/forgotpassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const resp = await response.json();
    return resp;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      console.log(error?.message);
    }
    return error;
  }
};

export const resetPasswordWithToken = async (password: string, confirmPassword: string, token: string) => {
  try {
    await fetch('/api/resetpassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, confirmPassword, token }),
    });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      console.log(error?.message);
    }
    return error;
  }
};

export const changePassword = async (oldPassword: string, password: string, confirmPassword: string) => {
  try {
    const response = await fetch('/api/changepassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword, password, confirmPassword }),
    });
    const resp = await response.json();
    return resp;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error?.message);
    }
    return error;
  }
};

export const deleteMe = async () => {
  try {
    const response = await fetch('/api/deleteMe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    await response.json();
  } catch (error: unknown) {
    return error;
  }
};
