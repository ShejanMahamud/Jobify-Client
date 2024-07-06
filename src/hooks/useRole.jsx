import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

const useRole = () => {
const {user,loading} = useAuth()
const axiosSecure = useAxiosSecure()

const {data:role,isPending:rolePending,refetch:roleRefetch} = useQuery({
    queryKey: ['user_role'],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
        const {data} = await axiosSecure.get(`/role/${user?.email}`)
        return data.role
    }
})
return {role,rolePending,roleRefetch}
}

export default useRole