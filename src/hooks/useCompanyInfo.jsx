import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from './useAxiosCommon';
import useUserInfo from './useUserInfo';

const useCompanyInfo = () => {

const axiosCommon = useAxiosCommon();
const {user} = useUserInfo();

const {data:companyInfo,isPending:companyInfoPending,refetch:companyInfoRefetch} = useQuery({
    queryKey: ['company_info',user?.email],
    queryFn: async () => {
        const {data} = await axiosCommon.get(`/companies?email=${user?.email}`)
        return data[0]
    }
})
return {...companyInfo,companyInfoPending,companyInfoRefetch}
}

export default useCompanyInfo