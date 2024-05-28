import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import useUserInfo from './useUserInfo'

const useJobAlert = () => {
    const axiosSecure = useAxiosSecure()
    const {userInfo} = useUserInfo()
    const {data:jobAlert = [],isPending:jobAlertPending} = useQuery({
      queryKey: ['job_alerts'],
      queryFn: async () => {
        const {data} = await axiosSecure.get(`/job_alert?preference=${userInfo?.job_preference}`)
        return data
      }
    })
    return {jobAlert, jobAlertCount:jobAlert.length,jobAlertPending}
}

export default useJobAlert