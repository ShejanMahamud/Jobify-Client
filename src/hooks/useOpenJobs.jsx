import { useQuery } from '@tanstack/react-query';

const useOpenJobs = (company_name) => {

const {data,refetch,isPending } = useQuery({
    queryKey: ['open_jobs',company_name],
    queryFn: async () => {
        const {data} = await axios.get(`http://localhost:5948/open_jobs?name=${company_name}`);
        return data
    }
})
return {data,refetch,isPending } 
}

export default useOpenJobs