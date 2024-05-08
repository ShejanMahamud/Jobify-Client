import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useJobs = (currentPage,itemsPerPage) => {

const {data,isLoading,refetch,isPending} = useQuery({
    queryKey: ['jobs',currentPage,itemsPerPage],
    queryFn: async () => {
        const {data} = await axios.get(`http://localhost:5948/search?page=${currentPage}&limit=${itemsPerPage}`)
        return data;
    }
});

return {data,isLoading,refetch,isPending}

};

export default useJobs;