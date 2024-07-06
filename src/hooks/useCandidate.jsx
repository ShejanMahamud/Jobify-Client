import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import { axiosSecure } from './useAxiosSecure'

const useCandidate = () => {
const {user} = useAuth()
const {data:candidate,isPending:candidatePending,refetch:candidateRefetch} = useQuery({
    queryKey: ['candidate',user?.email],
    queryFn: async () => {
        const {data} = await axiosSecure.get(`/candidate/${user?.email}`)
        return data
    }
})
return {data:candidate,isPending:candidatePending,refetch:candidateRefetch}
}

export default useCandidate