<script lang="ts">
	import PartySocket from 'partysocket';

	const socket = new PartySocket({
		// host: 'localhost:1999',
		host: 'codefork-party.noelvegacodes.partykit.dev',
		room: 'cursors'
	});

	let cursors = new Map<string, { x: number; y: number }>();
	socket.addEventListener('message', (e) => {
		const { type, cursor: liveCursor } = JSON.parse(e.data);
		if (type === 'cursor') {
			console.log('party: ', liveCursor);
			cursors = cursors.set(socket.id, liveCursor);
		}
	});

	$: console.log(Object.values(cursors));
</script>

<svelte:document
	on:pointermove={(e) => {
		socket.send(JSON.stringify({ type: 'cursor', cursor: { x: e.clientX, y: e.clientY } }));
	}}
	on:pointerleave={() => {
		socket.send(JSON.stringify({ type: 'cursor', cursor: null }));
	}}
/>

<div>
	{#each cursors.values() as cursor}
		{#if cursor !== null}
			<svg
				style="--x: {cursor?.x ?? 0}px; --y: {cursor?.y ?? 0}px"
				width="24"
				height="36"
				viewBox="0 0 24 36"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
					fill={'blue'}
				/>
			</svg>
		{/if}
	{/each}
</div>

<style>
	svg {
		position: absolute;
		left: 0;
		top: 0;
		transform: translateX(var(--x)) translateY(var(--y));
	}
</style>
