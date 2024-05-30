import fetchUserById from '@/utils/api/client/fetchUserById';
import { useQuery } from '@tanstack/react-query';

export default function useUserQuery(userId: number) {
  const { data, isLoading, error, refetch, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUserById(userId),
    enabled: Boolean(userId),
  });

  return {
    user: isSuccess ? data : undefined,
    userLoading: isLoading,
    userError: error,
    userRefetch: refetch,
  };
}
