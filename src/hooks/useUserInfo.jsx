import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from './useAxiosSecure';

const useUserInfo = () => {
  const auth = useContext(AuthContext)
  const {user} = auth;

    const axiosSecure = useAxiosSecure()
const {data:userInfo,isPending:userInfoPending,refetch:userInfoRefetch} = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
        const {data} = await axiosSecure.get(`/user/${user?.email}`)
        return data
    },
  });
  return {userInfo,userInfoPending,userInfoRefetch,...auth}
};

export default useUserInfo;
