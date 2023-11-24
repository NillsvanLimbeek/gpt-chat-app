<script lang="ts">
	import { type ComponentType, onMount } from 'svelte';

	import { ICONS, type IconProps, type IconName } from './';

	export let name: IconName;
	export let props: IconProps = {};

	let component: ComponentType;

	onMount(() => {
		const icon = ICONS.find((icon) => icon.name === name);
		if (!icon) throw new Error(`Icon "${name}" not found`);

		component = icon.component;
	});
</script>

<svelte:component this={component} {...props} />
