import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useTeacher = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isTeacher, isPending: isTeacherLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: [user?.email, 'isTeacher'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/teacher/${user.email}`);
       return res.data?.teacher;
    }
  });

  return [isTeacher, isTeacherLoading];
};

export default useTeacher;
