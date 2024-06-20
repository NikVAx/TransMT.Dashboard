import { useStore } from "@/app/store";

export const useAuthorization = () => {
    const authStore = useStore(x => x.authStore);

    const isAuthorized = authStore.user !== null;

    return isAuthorized;
};
