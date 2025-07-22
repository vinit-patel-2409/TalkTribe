import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserFriends, unfriend } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const queryClient = useQueryClient();

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { mutate: unfriendMutation, isPending: isUnfriending } = useMutation({
    mutationFn: unfriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      // Invalidate users to make them reappear in recommendations
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Your Friends</h2>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard
                key={friend._id}
                friend={friend}
                onUnfriend={() => unfriendMutation(friend._id)}
                isUnfriending={isUnfriending}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;

