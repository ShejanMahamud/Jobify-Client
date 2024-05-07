import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useJob = (id) => {
  const { data, refetch, isPending, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5948/job/${id}`);
      return data;
    },
  });

  return { data, refetch, isPending, isLoading };
};

export default useJob;
