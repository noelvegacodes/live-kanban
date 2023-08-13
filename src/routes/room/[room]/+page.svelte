<script lang="ts">
    import {page} from "$app/stores"
    import PartySocket from 'partysocket';

    let msg = ""
    let messages: string[] = []

	const socket = new PartySocket({
		host: 'codefork-party.noelvegacodes.partykit.dev',
		room: $page.params.room
	});

    socket.addEventListener("message", (evt) => {
        const data = JSON.parse(evt.data);
        if(data.type === "chatmsg") {
            messages = [...messages, data.msg]
        }
        console.log(evt.data)
    })


</script>

<ul>
    {#each messages as message}
        <li>{message}</li>
    {/each}
</ul>

<form on:submit|preventDefault={() => {
    console.log("submit")
    socket.send(JSON.stringify({type: "chatmsg", msg}))
}}>
    <input type="text" bind:value={msg} />
</form>