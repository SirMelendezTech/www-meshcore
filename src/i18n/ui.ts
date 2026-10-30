export const languages = {
	es: 'Español',
	en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

// Root-relative path of the home page for each locale. Spanish stays at `/`
// (prefixDefaultLocale: false in astro.config.mjs).
export const homePath: Record<Lang, string> = {
	es: '/',
	en: '/en/',
};

// MeshCore vs Meshtastic comparison page for each locale.
export const protocolsPath: Record<Lang, string> = {
	es: '/protocolos/',
	en: '/en/protocols/',
};

// Inline links live inside translated strings rendered with set:html, so the
// shared link styling is kept here.
const link = (href: string, text: string) =>
	`<a href="${href}" class="underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--ink)]">${text}</a>`;
export const linkHtml = link;
const strong = (text: string) => `<strong class="text-[var(--ink)]">${text}</strong>`;

const es = {
	meta: {
		title: 'MeshCore Puerto Rico — red mesh LoRa comunitaria',
		description:
			'Mensajes que no dependen de la señal celular. MeshCore Puerto Rico es una red mesh LoRa construida por la comunidad: configura tu radio, únete a la red y mantente comunicado cuando la infraestructura falla.',
		ogLocale: 'es_PR',
	},
	skipLink: 'Saltar al contenido',
	nav: {
		queEs: 'Qué es',
		hardware: 'Hardware',
		roles: 'Roles',
		protocolos: 'MeshCore vs Meshtastic',
		configura: 'Configura tu radio',
		unete: 'Únete',
		comunidad: 'Comunidad',
		openMenu: 'Abrir menú',
		switchLang: 'Read in English',
	},
	hero: {
		eyebrow: 'Red comunitaria — Puerto Rico',
		title: 'Cuando la señal celular cae, la sierra sigue hablando.',
		lead: 'MeshCore Puerto Rico es una red mesh de radios LoRa que repite mensajes de pico en pico. Sin internet, sin torres celulares y sin compañía de por medio — solo vecinos retransmitiendo mensajes entre nodos.',
		ctaPrimary: 'Configura tu radio',
		ctaSecondary: 'Cómo funciona',
		svgTitle: 'Picos de la Cordillera Central de Puerto Rico enlazados por saltos de radio',
		caption: 'Ilustración de saltos entre picos de la Cordillera Central — no representa cobertura real.',
	},
	queEs: {
		title: 'Radios que se cubren los unos a los otros',
		p1: 'MeshCore es un protocolo y firmware de código abierto para redes mesh sobre LoRa. Cada nodo recibe y retransmite mensajes a los demás dentro de su alcance, extendiendo la cobertura sin depender de infraestructura centralizada.',
		p2Html: `Este proyecto es hermano de ${link('https://prmsh.com', 'PRMSH (prmsh.com)')}, la red Meshtastic de la isla. Comparten comunidad y Discord; el protocolo de radio es distinto.`,
		compareHtml: `¿Cuál te conviene? ${link('/protocolos/', 'Compara MeshCore y Meshtastic')}.`,
		rasgos: [
			{
				title: 'Resiliente ante huracanes',
				desc: 'Sigue funcionando cuando la señal celular y el internet caen, como pasó semanas tras el huracán María (2017) y de nuevo con Fiona (2022).',
			},
			{
				title: 'Sin torres ni compañía de por medio',
				desc: 'Cada radio es un nodo. Los mensajes saltan de nodo a nodo por LoRa — no hay factura, contrato ni cobertura que depender de un tercero.',
			},
			{
				title: 'Firmware y protocolo abiertos',
				desc: 'MeshCore es de código abierto. Cualquiera puede revisar cómo funciona, correr su propio nodo o levantar un repetidor.',
			},
			{
				title: 'El terreno ayuda',
				desc: 'La Cordillera Central le da línea de vista a los saltos LoRa entre barrios, pueblos y costas — más pico, más alcance.',
			},
		],
	},
	hardware: {
		title: 'Consigue un radio compatible',
		introHtml: `Necesitas una placa ESP32 o nRF52 con módulo LoRa, de la variante de ${strong('915 MHz para EE.UU./Canadá')} — muchas tiendas venden la versión de 868 MHz pensada para Europa, que no sirve aquí. Un radio cuesta entre $25 y $60 según el modelo.`,
		items: [
			{
				nombre: 'Heltec V3 / Wireless Tracker',
				nota: 'Pantalla integrada, buena opción para empezar y ver el estado del nodo.',
			},
			{
				nombre: 'RAK4631 + RAK19007',
				nota: 'Módulo nRF52, bajo consumo, cómodo para un nodo que queda encendido todo el día.',
			},
			{
				nombre: 'Seeed XIAO + módulo LoRa',
				nota: 'El más pequeño y barato de armar; requiere más trabajo de ensamblaje.',
			},
			{
				nombre: 'LilyGO T-Deck / T3S3',
				nota: 'Con teclado o batería más grande, útil para llevarlo de excursión o en el carro.',
			},
		],
		flasherHtml: `¿La placa no trae MeshCore de fábrica? Flashéala directo desde el navegador con el ${link('https://meshcore.io/flasher', 'flasher oficial')} — conéctala por USB y elige el firmware según el rol que va a cumplir.`,
	},
	roles: {
		title: 'Elige qué rol va a cumplir tu nodo',
		intro: 'El firmware de MeshCore no es uno solo — cada nodo cumple un rol distinto en la red.',
		items: [
			{
				title: 'Companion',
				desc: 'Tu radio personal. Se empareja con el teléfono o la computadora para mandar y recibir mensajes. Es el rol correcto para empezar.',
			},
			{
				title: 'Repeater',
				desc: 'Extiende la cobertura de todos los demás — no tiene chat ni pantalla, solo retransmite. Ponlo en el punto más alto que consigas: azotea, torre o cerro. Entre más alto, a más nodos alcanza.',
			},
			{
				title: 'Room Server',
				desc: 'Un tablón de mensajes compartido: guarda avisos y se los entrega a quien pase por su alcance. Útil para un punto de encuentro, un refugio o un centro comunitario.',
			},
		],
	},
	configura: {
		title: 'Configura tu radio con el preset de EE.UU.',
		introHtml: `Si tu radio llegó de fábrica o lo acabas de flashear, tienes que fijar la región antes de usarlo. Puerto Rico usa el preset ${strong('USA/Canadá')}, el mismo que el resto del territorio continental.`,
		pasos: [
			{
				title: 'Instala una app MeshCore',
				descHtml: `La app oficial MeshCore cubre Android e iOS. Si vas a usar tu radio con iPhone, iPad o Mac, ${link('https://meshcoreone.com', 'MeshCore One')} es un cliente más completo — línea de vista, gestión remota de repetidores y más herramientas de diagnóstico.`,
			},
			{
				title: 'Empareja tu radio por Bluetooth',
				descHtml: 'Enciende el dispositivo, ábrelo en la app y confirma el emparejamiento.',
			},
			{
				title: 'Elige el preset de radio “USA/Canadá”',
				descHtml: 'Puerto Rico está bajo la jurisdicción de la FCC, así que usa el mismo preset que el resto de Estados Unidos — no el de Europa.',
			},
			{
				title: 'Guarda y reinicia el nodo',
				descHtml: 'El radio aplica los valores y vuelve a sincronizarse con los nodos cercanos.',
			},
		],
		presetLabel: 'Preset — USA/Canadá',
		specs: [
			{ k: 'Frecuencia', v: '910.525 MHz' },
			{ k: 'Ancho de banda', v: '62.5 kHz' },
			{ k: 'Factor de dispersión', v: 'SF7' },
			{ k: 'Tasa de codificación', v: 'CR 5' },
			{ k: 'Banda', v: '902–928 MHz ISM' },
		],
		presetNote:
			'Valores del preset comunitario USA/Canadá usado en la mayoría de redes MeshCore de Estados Unidos y Puerto Rico. Confírmalos en el selector de la app antes de transmitir — pueden cambiar entre versiones.',
	},
	unete: {
		title: 'Únete a la red de la isla',
		intro: 'Con el radio configurado, ya puedes sumarte al canal público de Puerto Rico.',
		pasos: [
			{
				title: 'Pide el canal vigente en Discord',
				desc: 'El nombre y la clave del canal público de Puerto Rico se comparten y actualizan ahí — no los fijamos en esta página para que nunca queden desactualizados.',
			},
			{
				title: 'Agrégalo en tu app',
				desc: 'Con esos datos vas a ver y repetir los mensajes de los demás nodos de la isla.',
			},
			{
				title: 'Pon tu nodo en alto',
				desc: 'Azotea, balcón o un punto elevado del terreno — entre más alto, más fácil le llega la señal al próximo nodo.',
			},
			{
				title: 'Avisa dónde quedó',
				desc: 'Comparte tu ubicación aproximada en Discord para que el resto de la comunidad sepa por dónde hay cobertura.',
			},
		],
	},
	comunidad: {
		title: 'Coordinamos repetidores entre todos',
		body: 'El Discord es donde se comparte el canal vigente, se resuelven dudas de configuración, se discuten ubicaciones de repetidores y se avisan activaciones durante emergencias.',
		discord: 'Entrar al Discord',
		whatsapp: 'Unirte en WhatsApp',
		sister: 'Ver la red hermana en prmsh.com',
	},
	footer: {
		note: 'MeshCore Puerto Rico — proyecto comunitario, código abierto. No es un servicio de emergencia; para 911, llama al 911.',
	},
};

export type Dictionary = typeof es;

const en: Dictionary = {
	meta: {
		title: 'MeshCore Puerto Rico — community LoRa mesh network',
		description:
			"Messages that don't depend on cell service. MeshCore Puerto Rico is a community-built LoRa mesh network: set up your radio, join the network and stay connected when infrastructure fails.",
		ogLocale: 'en_US',
	},
	skipLink: 'Skip to content',
	nav: {
		queEs: 'What it is',
		hardware: 'Hardware',
		roles: 'Roles',
		protocolos: 'MeshCore vs Meshtastic',
		configura: 'Set up your radio',
		unete: 'Join',
		comunidad: 'Community',
		openMenu: 'Open menu',
		switchLang: 'Leer en español',
	},
	hero: {
		eyebrow: 'Community network — Puerto Rico',
		title: 'When cell service goes down, the mountains keep talking.',
		lead: 'MeshCore Puerto Rico is a mesh network of LoRa radios that relays messages from peak to peak. No internet, no cell towers and no company in the middle — just neighbors passing messages between nodes.',
		ctaPrimary: 'Set up your radio',
		ctaSecondary: 'How it works',
		svgTitle: "Peaks of Puerto Rico's Cordillera Central linked by radio hops",
		caption: 'Illustration of hops between peaks of the Cordillera Central — does not represent actual coverage.',
	},
	queEs: {
		title: 'Radios that look out for each other',
		p1: 'MeshCore is an open-source protocol and firmware for LoRa mesh networks. Each node receives messages and relays them to the others within range, extending coverage without relying on centralized infrastructure.',
		p2Html: `This project is a sibling of ${link('https://prmsh.com', 'PRMSH (prmsh.com)')}, the island's Meshtastic network. They share a community and a Discord; the radio protocol is different.`,
		compareHtml: `Which one fits you? ${link('/en/protocols/', 'Compare MeshCore and Meshtastic')}.`,
		rasgos: [
			{
				title: 'Hurricane-resilient',
				desc: 'Keeps working when cell service and internet go down, as they did for weeks after Hurricane María (2017) and again with Fiona (2022).',
			},
			{
				title: 'No towers, no company in the middle',
				desc: 'Every radio is a node. Messages hop from node to node over LoRa — no bill, no contract and no coverage that depends on a third party.',
			},
			{
				title: 'Open firmware and protocol',
				desc: 'MeshCore is open source. Anyone can see how it works, run their own node or put up a repeater.',
			},
			{
				title: 'The terrain helps',
				desc: 'The Cordillera Central gives LoRa hops line of sight between neighborhoods, towns and coasts — higher peaks, longer reach.',
			},
		],
	},
	hardware: {
		title: 'Get a compatible radio',
		introHtml: `You need an ESP32 or nRF52 board with a LoRa module, in the ${strong('915 MHz US/Canada')} variant — many stores sell the 868 MHz version meant for Europe, which won't work here. A radio costs between $25 and $60 depending on the model.`,
		items: [
			{
				nombre: 'Heltec V3 / Wireless Tracker',
				nota: 'Built-in screen; a good choice for getting started and checking on your node.',
			},
			{
				nombre: 'RAK4631 + RAK19007',
				nota: 'nRF52 module with low power draw, well suited to a node that stays on all day.',
			},
			{
				nombre: 'Seeed XIAO + LoRa module',
				nota: 'The smallest and cheapest to build; takes more assembly work.',
			},
			{
				nombre: 'LilyGO T-Deck / T3S3',
				nota: 'With a keyboard or a bigger battery, handy for hikes or keeping in the car.',
			},
		],
		flasherHtml: `Board didn't ship with MeshCore? Flash it straight from your browser with the ${link('https://meshcore.io/flasher', 'official flasher')} — plug it in over USB and pick the firmware for the role it will play.`,
	},
	roles: {
		title: 'Choose the role your node will play',
		intro: "MeshCore firmware isn't one-size-fits-all — each node plays a different role in the network.",
		items: [
			{
				title: 'Companion',
				desc: 'Your personal radio. It pairs with your phone or computer to send and receive messages. This is the right role to start with.',
			},
			{
				title: 'Repeater',
				desc: "Extends coverage for everyone else — it has no chat or screen, it only relays. Put it at the highest spot you can find: a rooftop, tower or hilltop. The higher it is, the more nodes it reaches.",
			},
			{
				title: 'Room Server',
				desc: 'A shared message board: it stores posts and delivers them to anyone who comes within range. Useful for a meeting point, a shelter or a community center.',
			},
		],
	},
	configura: {
		title: 'Set up your radio with the US preset',
		introHtml: `Whether your radio came straight from the factory or you just flashed it, you need to set the region before using it. Puerto Rico uses the ${strong('USA/Canada')} preset, the same as the mainland.`,
		pasos: [
			{
				title: 'Install a MeshCore app',
				descHtml: `The official MeshCore app covers Android and iOS. If you'll use your radio with an iPhone, iPad or Mac, ${link('https://meshcoreone.com', 'MeshCore One')} is a more complete client — line of sight, remote repeater management and more diagnostic tools.`,
			},
			{
				title: 'Pair your radio over Bluetooth',
				descHtml: 'Turn on the device, open it in the app and confirm the pairing.',
			},
			{
				title: 'Choose the “USA/Canada” radio preset',
				descHtml: "Puerto Rico falls under FCC jurisdiction, so use the same preset as the rest of the United States — not the European one.",
			},
			{
				title: 'Save and reboot the node',
				descHtml: 'The radio applies the settings and resyncs with nearby nodes.',
			},
		],
		presetLabel: 'Preset — USA/Canada',
		specs: [
			{ k: 'Frequency', v: '910.525 MHz' },
			{ k: 'Bandwidth', v: '62.5 kHz' },
			{ k: 'Spreading factor', v: 'SF7' },
			{ k: 'Coding rate', v: 'CR 5' },
			{ k: 'Band', v: '902–928 MHz ISM' },
		],
		presetNote:
			'Values of the community USA/Canada preset used by most MeshCore networks in the United States and Puerto Rico. Confirm them in the app’s preset picker before transmitting — they can change between versions.',
	},
	unete: {
		title: "Join the island's network",
		intro: "Once your radio is set up, you're ready to join Puerto Rico's public channel.",
		pasos: [
			{
				title: 'Ask for the current channel on Discord',
				desc: "The name and key for Puerto Rico's public channel are shared and kept up to date there — we don't post them on this page so they never go stale.",
			},
			{
				title: 'Add it in your app',
				desc: "With those details you'll see and relay messages from the other nodes on the island.",
			},
			{
				title: 'Put your node up high',
				desc: 'A rooftop, balcony or high ground — the higher it is, the easier its signal reaches the next node.',
			},
			{
				title: 'Let us know where it is',
				desc: 'Share your approximate location on Discord so the rest of the community knows where there is coverage.',
			},
		],
	},
	comunidad: {
		title: 'We coordinate repeaters together',
		body: 'Discord is where the current channel is shared, setup questions get answered, repeater locations are discussed and activations are announced during emergencies.',
		discord: 'Join the Discord',
		whatsapp: 'Join on WhatsApp',
		sister: 'Visit the sister network at prmsh.com',
	},
	footer: {
		note: 'MeshCore Puerto Rico — community project, open source. Not an emergency service; for emergencies, call 911.',
	},
};

export const ui: Record<Lang, Dictionary> = { es, en };
