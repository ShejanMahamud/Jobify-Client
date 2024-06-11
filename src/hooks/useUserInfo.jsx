import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from './useAxiosSecure';

const useUserInfo = () => {
    const axiosSecure = useAxiosSecure();
    const auth = useAuth();

    const { data: userInfo, isLoading: userInfoPending, refetch: userInfoRefetch } = useQuery({
        queryKey: ["userInfo", auth?.user?.email],
        enabled: !auth?.loading && !!auth?.user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${auth?.user?.email}`);
            return data;
        },
    });

    return { userInfo, userInfoPending, userInfoRefetch, ...auth };
};

export default useUserInfo;
