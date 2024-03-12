import { amILoggedIn } from '@/services/auth';
import { useUserStore } from '@/stores/userStore';
import router from '@/router';

export const authGuard = async () => {
  const logInInfo = await amILoggedIn();
  if (logInInfo) {
    const userStore = useUserStore();
    await userStore.initUser();
  } else {
    router.push({ path: '/' });
  }
};
