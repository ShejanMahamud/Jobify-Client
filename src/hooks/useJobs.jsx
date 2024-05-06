import { useQuery } from "@tanstack/react-query";

const useJobs = () => {

const {data,isLoading,refetch,isPending} = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
        const res = await fetch(`http://localhost:5948/jobs`)
        const data = await res.json()
        return data;
    }
});

return {data,isLoading,refetch,isPending}

};

export default useJobs;