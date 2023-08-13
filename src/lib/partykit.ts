import PartySocket from 'partysocket';

export function useSocket(roomId: string) {
	const socket = new PartySocket({
		host: 'codefork-party.noelvegacodes.partykit.dev',
		room: roomId
	});
	return socket;
}
