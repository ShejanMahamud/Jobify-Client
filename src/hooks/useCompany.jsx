import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from './useAxiosCommon';

const useCompany = (id) => {
  const axiosCommon = useAxiosCommon()
  const { data:company, refetch, isPending:companyIsPending, isLoading } = useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/companies?id=${id}`);
      return data[0];
    },
  });

  return { company, refetch, companyIsPending, isLoading };
};

export default useCompany;
