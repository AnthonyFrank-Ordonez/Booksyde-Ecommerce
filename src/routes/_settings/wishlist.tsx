import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useGetOrCreateWishlist } from '@/utils/servers/wishlist';

export const Route = createFileRoute('/_settings/wishlist')({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		const userId = context.userID;

		await context.queryClient.ensureQueryData(useGetOrCreateWishlist(userId));

		return { userId };
	},
});

function RouteComponent() {
	const { userId } = Route.useRouteContext();
	const userWishlist = useSuspenseQuery(useGetOrCreateWishlist(userId)).data;
	console.log('🚀 ~ RouteComponent ~ userWishlist:', userWishlist);
	return <div>Hello "/_settings/wishlist"!</div>;
}
