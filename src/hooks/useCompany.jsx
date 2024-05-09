import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCompany = (company_name) => {
  const { data, refetch, isPending, isLoading } = useQuery({
    queryKey: ['company', company_name],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5948/companies?name=${company_name}`);
      return data;
    },
  });

  return { data, refetch, isPending, isLoading };
};

export default useCompany;
