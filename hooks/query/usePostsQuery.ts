import fetchApiPosts from '@/utils/api/client/fetchApiPosts';
import { useQuery } from '@tanstack/react-query';

interface Params {
  size: number;
  page: number;
  userId: number;
  categoryId: number;
  published: boolean;
  search: string;
  furnished: boolean;
  rooms: number[];
  min: number;
  max: number;
}

export default function usePostsQuery(params: Partial<Params>, enabled = true) {
  const { data, isLoading, error, refetch, isPending, isRefetching, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchApiPosts(params),
    enabled: enabled,
  });
  return {
    posts: data,
    postsLoading: isFetching || isRefetching,
    postsError: error,
    postsRefetch: refetch,
  };
}
