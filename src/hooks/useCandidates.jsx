import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCandidates = (id) => {

    const axiosSecure = useAxiosSecure()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["candidates", id],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/candidates?id=${id}`);
          return data;
        },
      });
      return { data, isLoading, refetch }
}

export default useCandidates