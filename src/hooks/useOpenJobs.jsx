import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from './useAxiosCommon';

const useOpenJobs = (company_name) => {
const axiosCommon = useAxiosCommon()
const {data:openJobs,refetch:openJobsRefetch,isPending:openJobsPending } = useQuery({
    queryKey: ['open_jobs',company_name],
    queryFn: async () => {
        const {data} = await axiosCommon.get(`/jobs?open_jobs=${company_name}`);
        return data
    }
})
return {openJobs,openJobsRefetch,openJobsPending } 
}

export default useOpenJobs