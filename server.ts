import type { PartyKitConnection, PartyKitRoom, PartyKitContext } from 'partykit/server';

export default {
	onConnect(websocket: PartyKitConnection, room: PartyKitRoom) {
		// This is invoked whenever a user joins a room
		websocket.addEventListener('message', (e) => {
			if (typeof e.data === 'string') {
				const data = JSON.parse(e.data);
				if (data.type === 'chatmsg') {
					room.broadcast(e.data);
				}
			}
		});
	},
	// optionally, you can respond to HTTP requests as well
	onRequest(request: PartyKitContext, room: PartyKitRoom) {
		console.log('request', request);
		return new Response('hello from room: ' + room.id);
	}
};
