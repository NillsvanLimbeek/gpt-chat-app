<script>
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	import '../app.postcss';

	const client = new QueryClient();
</script>

<QueryClientProvider {client}>
	<slot />
</QueryClientProvider>
