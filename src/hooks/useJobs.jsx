import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useJobs = (currentPage,itemPerPage) => {

const {data,isLoading,refetch,isPending} = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
        const {data} = await axios.get(`http://localhost:5948/search?page=${currentPage}&limit=${itemPerPage}`)
        return data;
    }
});

return {data,isLoading,refetch,isPending}

};

export default useJobs;