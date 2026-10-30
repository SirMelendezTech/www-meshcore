import { linkHtml as link, type Lang } from './ui';

// MeshCore vs Meshtastic comparison. Facts summarized from NodakMesh's
// comparison (checked October 2026 against MeshCore 1.18.0, Meshtastic 2.7.26
// stable and 2.8.1 alpha) — re-check version-specific rows on each release.
const sourceUrl = 'https://nodakmesh.org/protocols';

const es = {
	meta: {
		title: 'MeshCore vs Meshtastic — diferencias y cuál elegir | MeshCore PR',
		description:
			'Comparación de MeshCore y Meshtastic, los dos protocolos mesh LoRa más usados: quién retransmite, alcance, cifrado, apps, hardware y cuál conviene en Puerto Rico.',
	},
	hero: {
		eyebrow: 'Protocolos — octubre 2026',
		title: 'MeshCore vs Meshtastic',
		lead: 'Los dos mandan texto sin señal celular ni internet, y corren en el mismo hardware barato. La diferencia de fondo es quién retransmite: en Meshtastic, cualquier nodo; en MeshCore, solo los repetidores. Eso cambia cómo escala la red, cuánto hay que planificar y cómo se siente el primer día.',
		checked: 'Revisado contra MeshCore 1.18.0, Meshtastic 2.7.26 (estable) y 2.8.1 (alpha).',
	},
	corto: {
		title: 'La respuesta corta',
		meshtastic: {
			title: 'Elige Meshtastic si…',
			items: [
				'quieres que dos radios hablen de inmediato, sin montar nada más;',
				'vas de excursión, a un evento o te mueves en grupo;',
				'prefieres firmware y apps 100% de código abierto;',
				'tu red local ya usa Meshtastic — en la isla, esa es PRMSH.',
			],
		},
		meshcore: {
			title: 'Elige MeshCore si…',
			items: [
				'quieres cobertura de pueblo o región con repetidores en puntos altos;',
				'mucha gente comparte la red y el tiempo de aire importa;',
				'quieres mensajes directos que viajen por una ruta fija;',
				'tu red local ya usa MeshCore — como esta red en Puerto Rico.',
			],
		},
		incompatHtml: `<strong class="text-[var(--ink)]">No se entienden entre sí.</strong> Usan formato de paquete, cifrado, sync word de LoRa y (casi siempre) frecuencia distintos. El hardware sí es el mismo: una placa se puede reflashear de uno a otro.`,
	},
	tabla: {
		title: 'Lado a lado',
		feature: 'Aspecto',
		rows: [
			{ k: 'Quién retransmite', mt: 'Todos los nodos por defecto, más routers', mc: 'Solo repetidores; los companions no retransmiten' },
			{ k: 'Cómo viaja el mensaje', mt: 'Inundación controlada; los DM usan ruta next-hop cuando la conocen (desde 2.6)', mc: 'Los canales inundan por repetidores; el DM inunda una vez y luego sigue la ruta aprendida' },
			{ k: 'Límite de saltos', mt: '1 a 7, por defecto 3', mc: 'Hasta 63 (IDs de 1 byte), o 32 / 21 con IDs más largos' },
			{ k: 'Largo del texto', mt: '200 bytes en las apps', mc: '160 bytes (150 en DM, menos en canales)' },
			{ k: 'Cifrado', mt: 'Canales AES; DM con llave pública (2.5+); broadcasts firmados (2.8)', mc: 'Identidad Ed25519, adverts firmados, AES-128 en DM y canales' },
			{ k: 'App de teléfono', mt: 'Gratis y abierta (Android, iPhone, web)', mc: 'Gratis; la gestión de repetidores en el teléfono tiene un temporizador que se quita con compra en la app' },
			{ k: 'Licencia del firmware', mt: 'GPL-3.0', mc: 'MIT' },
			{ k: 'Ajuste por defecto en EE.UU.', mt: 'LongFast: 906.875 MHz, 250 kHz, SF11', mc: 'Recomendado: 910.525 MHz, 62.5 kHz, SF7' },
			{ k: '¿Necesita infraestructura?', mt: 'No; dos radios de mano ya forman una red', mc: 'Para pasar del alcance directo, sí: al menos un repetidor' },
			{ k: 'Inicio del proyecto', mt: '2020', mc: '2025' },
		],
	},
	ruteo: {
		title: 'Cómo mueve cada uno un mensaje',
		meshtastic: {
			title: 'Meshtastic: inundación controlada',
			items: [
				'Cada nodo que oye un mensaje nuevo espera un instante y lo repite; los más lejanos tienden a retransmitir primero.',
				'El límite de saltos evita que el mensaje rebote para siempre.',
				'Desde 2.6, los DM aprenden una ruta next-hop y vuelven a inundar si el vecino deja de responder. Broadcasts y canales siguen inundando.',
				'Roles: CLIENT (por defecto) retransmite cuando hace falta; CLIENT_MUTE nunca; ROUTER y ROUTER_LATE siempre.',
				'En 2.8, los broadcasts de fondo bajan su límite de saltos cuando el canal pasa de 20% de uso. El chat conserva el límite completo.',
			],
		},
		meshcore: {
			title: 'MeshCore: repetidores y rutas aprendidas',
			items: [
				'Companion: tu radio personal, emparejado con la app. No retransmite.',
				'Repeater: va en alto y retransmite para todos. Room server: un tablón al que los usuarios entran.',
				'El primer DM inunda. El acuse de entrega trae la ruta de vuelta y el remitente la guarda; los siguientes mensajes la llevan y solo repiten los repetidores de esa lista.',
				'Los repetidores no guardan tablas de ruteo: la ruta vive con quien envía.',
				'Los mensajes de canal siempre inundan; el dueño del repetidor puede limitar hasta dónde.',
				'IDs de ruta de 1 byte permiten 63 saltos. Desde 1.14, IDs de 2 y 3 bytes permiten 32 y 21, pero repetidores anteriores a 1.14 los descartan.',
			],
		},
	},
	alcance: {
		title: '¿Cuál llega más lejos?',
		paragraphs: [
			'Ninguno por diseño. El alcance depende de los ajustes de radio, la potencia, la antena, la altura y el terreno — y la altura es lo que más pesa. En Puerto Rico, la Cordillera Central hace más que cualquier preset.',
			'Los valores por defecto sí difieren: LongFast usa SF11 en 250 kHz; el preset de MeshCore usa SF7 en 62.5 kHz. En papel, LongFast tiene unos 4 dB más de presupuesto de enlace, mientras que el preset estrecho de MeshCore ocupa menos tiempo de aire y una franja más angosta de la banda.',
			'Algunas regiones corren MeshCore en SF8 o SF9, lo que achica la diferencia. Igual, cuántos repetidores hay y dónde están importa más que el preset.',
		],
	},
	cifrado: {
		title: 'Cifrado y privacidad',
		meshtastic: {
			title: 'Meshtastic',
			items: [
				'Los canales usan una llave AES compartida; la del canal por defecto es pública.',
				'Los DM usan cifrado de llave pública (desde 2.5).',
				'2.8 firma los broadcasts, aunque por defecto sigue aceptando paquetes sin firma de firmware viejo.',
			],
		},
		meshcore: {
			title: 'MeshCore',
			items: [
				'Cada nodo tiene un par de llaves Ed25519 y sus adverts van firmados.',
				'Los DM usan una llave que solo comparten los dos nodos, con AES-128.',
				'Los canales usan una llave compartida de 128 bits. La del canal Public es pública, y los canales con hashtag están abiertos a quien escriba el nombre.',
			],
		},
		ambos: 'En los dos, el canal público por defecto lo puede leer cualquiera en la red. Para algo sensible, usa un canal privado o un DM.',
	},
	apps: {
		title: 'Apps, hardware y costo',
		items: [
			{
				title: 'Mismo hardware',
				desc: 'Heltec V3 y V4, RAK WisBlock, LilyGO T-Beam, T-Echo y T-Deck, Seeed T1000-E y otros corren cualquiera de los dos.',
			},
			{
				title: 'Apps de Meshtastic',
				desc: 'Gratis y de código abierto para Android, iPhone y web; conectan por Bluetooth, Wi-Fi o USB. Firmware GPL-3.0.',
			},
			{
				title: 'App de MeshCore',
				desc: 'La app oficial (de Liam Cottle) es gratis en Android, iPhone, escritorio y web. En el teléfono, la gestión de repetidores tiene un temporizador que se quita con una compra; en escritorio está todo desbloqueado. La app no es abierta, pero el firmware es MIT y hay clientes de la comunidad. Equipos como el T-Deck corren MeshCore sin teléfono.',
			},
		],
	},
	novedades: {
		title: 'Qué hay de nuevo en 2026',
		meshtastic: {
			title: 'Meshtastic 2.8 (alpha)',
			items: [
				'Broadcasts firmados.',
				'Nodos nuevos en EE.UU. configurados en el equipo o con la app de Android actual arrancan en LongTurbo, que no oye redes LongFast.',
				'El ID del nodo sale de su llave pública, así que los nodos actualizados cambian de ID.',
				'Compartir posición en canales públicos y toda la telemetría pasan a ser opcionales.',
				'Escalado automático de saltos y límites de tasa para redes cargadas.',
				'La versión estable sigue siendo 2.7.26.',
			],
		},
		meshcore: {
			title: 'MeshCore 1.18',
			items: [
				'Línea de comandos para companions, incluidos comandos desde contactos autorizados.',
				'Bluetooth y Wi-Fi en un mismo build de companion en varias placas ESP32.',
				'Detección de bucles en repetidores con un valor por defecto más suave.',
				'Se suma a los IDs de ruta más largos de 1.14 y a las actualizaciones OTA para companions nRF52 de 1.15.',
			],
		},
	},
	faq: {
		title: 'Preguntas frecuentes',
		items: [
			{
				q: '¿Se pueden comunicar entre sí?',
				a: 'No. Formato de paquete, cifrado, sync word y los ajustes usuales en EE.UU. son distintos. Un radio corre un solo firmware a la vez.',
			},
			{
				q: '¿Un mismo equipo puede cambiar de uno a otro?',
				a: 'Sí, en la mayoría de placas LoRa, con los flashers web. La identidad, los contactos y los ajustes no se transfieren; hay que volver a fijar región y preset.',
			},
			{
				q: '¿Cuál tiene más alcance?',
				a: 'Ninguno de por sí. Dónde están los repetidores o routers pesa más que el protocolo.',
			},
			{
				q: '¿Cuál es mejor?',
				a: 'Depende de la red. MeshCore va bien en redes planificadas con repetidores; Meshtastic, en grupos sin infraestructura. Casi siempre, lo mejor es usar lo que ya corre tu comunidad.',
			},
			{
				q: '¿Ciudad o campo?',
				a: 'En zonas urbanas, MeshCore mantiene bajo el tiempo de aire (y Meshtastic 2.8 añade escalado de saltos para redes cargadas). En zonas rurales con pocos nodos, Meshtastic no necesita infraestructura fija; MeshCore necesita repetidores bien ubicados para cubrir distancias largas.',
			},
			{
				q: '¿MeshCore es gratis?',
				a: 'Sí. El firmware es MIT y la app es gratis. Una compra opcional quita el temporizador de gestión de repetidores en el teléfono. La app oficial no es de código abierto.',
			},
		],
	},
	cta: {
		title: '¿Listo para probar MeshCore?',
		body: 'Si ya decidiste, configura tu radio con el preset de EE.UU. y únete al canal de la isla. Si prefieres Meshtastic, la red hermana PRMSH te recibe.',
		primary: 'Configura tu radio',
		sister: 'Ir a PRMSH (Meshtastic)',
	},
	sourceHtml: `Datos resumidos de la ${link(sourceUrl, 'comparación de NodakMesh')} (octubre 2026). MeshCore PR no está afiliado a los proyectos MeshCore ni Meshtastic.`,
};

export type ProtocolosDictionary = typeof es;

const en: ProtocolosDictionary = {
	meta: {
		title: 'MeshCore vs Meshtastic — differences and which to pick | MeshCore PR',
		description:
			'A comparison of MeshCore and Meshtastic, the two most used LoRa mesh protocols: who relays, range, encryption, apps, hardware and which one fits Puerto Rico.',
	},
	hero: {
		eyebrow: 'Protocols — October 2026',
		title: 'MeshCore vs Meshtastic',
		lead: 'Both send text without cell service or internet, and both run on the same cheap hardware. The core difference is who relays: in Meshtastic, any node; in MeshCore, only repeaters. That shapes how the network scales, how much planning it takes and what your first day feels like.',
		checked: 'Checked against MeshCore 1.18.0, Meshtastic 2.7.26 (stable) and 2.8.1 (alpha).',
	},
	corto: {
		title: 'The short answer',
		meshtastic: {
			title: 'Pick Meshtastic if…',
			items: [
				'you want two radios talking right away, with nothing else to set up;',
				"you're hiking, at an event or moving as a group;",
				'you want fully open-source firmware and apps;',
				'your local mesh already runs Meshtastic — on the island, that’s PRMSH.',
			],
		},
		meshcore: {
			title: 'Pick MeshCore if…',
			items: [
				'you want town or regional coverage with repeaters on high points;',
				'many people share the mesh and airtime matters;',
				'you want direct messages that travel a fixed path;',
				'your local mesh already runs MeshCore — like this network in Puerto Rico.',
			],
		},
		incompatHtml: `<strong class="text-[var(--ink)]">They can’t hear each other.</strong> Packet format, encryption, LoRa sync word and (usually) frequency all differ. The hardware is shared, though: a board can be reflashed from one to the other.`,
	},
	tabla: {
		title: 'Side by side',
		feature: 'Feature',
		rows: [
			{ k: 'Who relays', mt: 'Every node by default, plus routers', mc: "Only repeaters; companions don't relay" },
			{ k: 'How a message travels', mt: 'Managed flooding; DMs use next-hop routing once a route is known (since 2.6)', mc: 'Channels flood through repeaters; a DM floods once, then follows the learned path' },
			{ k: 'Hop limit', mt: '1 to 7, default 3', mc: 'Up to 63 (1-byte IDs), or 32 / 21 with longer IDs' },
			{ k: 'Text length', mt: '200 bytes in the apps', mc: '160 bytes (150 in DMs, less in channels)' },
			{ k: 'Encryption', mt: 'AES channels; public-key DMs (2.5+); signed broadcasts (2.8)', mc: 'Ed25519 identities, signed adverts, AES-128 DMs and channels' },
			{ k: 'Phone app', mt: 'Free and open source (Android, iPhone, web)', mc: 'Free; phone repeater management has a timer removable by in-app purchase' },
			{ k: 'Firmware license', mt: 'GPL-3.0', mc: 'MIT' },
			{ k: 'Default US settings', mt: 'LongFast: 906.875 MHz, 250 kHz, SF11', mc: 'Recommended: 910.525 MHz, 62.5 kHz, SF7' },
			{ k: 'Needs infrastructure?', mt: 'No; two handhelds already form a mesh', mc: 'Beyond direct range, yes: at least one repeater' },
			{ k: 'Project started', mt: '2020', mc: '2025' },
		],
	},
	ruteo: {
		title: 'How each moves a message',
		meshtastic: {
			title: 'Meshtastic: managed flooding',
			items: [
				'Every node that hears a new message waits a moment and repeats it; the farthest nodes tend to relay first.',
				'The hop limit keeps a message from bouncing around forever.',
				'Since 2.6, DMs learn a next-hop route and fall back to flooding if the neighbor stops answering. Broadcasts and channels still flood.',
				'Roles: CLIENT (default) relays when needed; CLIENT_MUTE never does; ROUTER and ROUTER_LATE always do.',
				'In 2.8, background broadcasts lower their hop limit once channel utilization passes 20%. Chat keeps the full limit.',
			],
		},
		meshcore: {
			title: 'MeshCore: repeaters and learned paths',
			items: [
				"Companion: your personal radio, paired with the app. It doesn't relay.",
				'Repeater: sits up high and relays for everyone. Room server: a message board users log into.',
				'The first DM floods. The delivery report carries the path back and the sender saves it; later messages carry that path and only the listed repeaters relay.',
				'Repeaters keep no routing tables: the path lives with the sender.',
				'Channel messages always flood; repeater owners can limit how far.',
				'1-byte path IDs allow 63 hops. Since 1.14, 2- and 3-byte IDs allow 32 and 21, but repeaters older than 1.14 drop them.',
			],
		},
	},
	alcance: {
		title: 'Which one reaches farther?',
		paragraphs: [
			'Neither, by design. Range comes down to radio settings, power, antenna, height and terrain — and height matters most. In Puerto Rico, the Cordillera Central does more than any preset.',
			"The defaults do differ: LongFast uses SF11 on 250 kHz; MeshCore's preset uses SF7 on 62.5 kHz. On paper, LongFast has about 4 dB more link budget, while MeshCore's narrow preset uses less airtime and a thinner slice of the band.",
			'Some regions run MeshCore at SF8 or SF9, which narrows the gap. Either way, how many repeaters there are and where they sit matters more than the preset.',
		],
	},
	cifrado: {
		title: 'Encryption and privacy',
		meshtastic: {
			title: 'Meshtastic',
			items: [
				"Channels use a shared AES key; the default channel's key is public.",
				'DMs use public-key encryption (since 2.5).',
				'2.8 signs broadcasts, though by default it still accepts unsigned packets from older firmware.',
			],
		},
		meshcore: {
			title: 'MeshCore',
			items: [
				'Each node has an Ed25519 key pair, and its adverts are signed.',
				'DMs use a key shared only by the two nodes, with AES-128.',
				"Channels use a shared 128-bit key. The Public channel's key is published, and hashtag channels are open to anyone who types the name.",
			],
		},
		ambos: 'In both, the default public channel can be read by anyone on the mesh. For anything sensitive, use a private channel or a DM.',
	},
	apps: {
		title: 'Apps, hardware and cost',
		items: [
			{
				title: 'Same hardware',
				desc: 'Heltec V3 and V4, RAK WisBlock, LilyGO T-Beam, T-Echo and T-Deck, Seeed T1000-E and others run either one.',
			},
			{
				title: 'Meshtastic apps',
				desc: 'Free and open source for Android, iPhone and web; connect over Bluetooth, Wi-Fi or USB. GPL-3.0 firmware.',
			},
			{
				title: 'MeshCore app',
				desc: "The official app (by Liam Cottle) is free on Android, iPhone, desktop and web. On phones, repeater management has a timer removable by purchase; desktop is fully unlocked. The app isn't open source, but the firmware is MIT and community clients exist. Devices like the T-Deck run MeshCore without a phone.",
			},
		],
	},
	novedades: {
		title: "What's new in 2026",
		meshtastic: {
			title: 'Meshtastic 2.8 (alpha)',
			items: [
				'Signed broadcasts.',
				"New US nodes set up on-device or with the current Android app default to LongTurbo, which can't hear LongFast meshes.",
				'Node IDs derive from the public key, so updated nodes get new IDs.',
				'Position sharing on public channels and all telemetry broadcasts become opt-in.',
				'Automatic hop scaling and rate limits for busy meshes.',
				'2.7.26 remains the stable release.',
			],
		},
		meshcore: {
			title: 'MeshCore 1.18',
			items: [
				'Command line for companions, including commands from allowed contacts.',
				'Bluetooth and Wi-Fi in one companion build on several ESP32 boards.',
				'A gentler default for repeater loop detection.',
				"Builds on 1.14's longer path IDs and 1.15's OTA updates for nRF52 companions.",
			],
		},
	},
	faq: {
		title: 'FAQ',
		items: [
			{
				q: 'Can they talk to each other?',
				a: 'No. Packet format, encryption, sync word and the usual US settings all differ. A radio runs one firmware at a time.',
			},
			{
				q: 'Can one device switch between them?',
				a: "Yes, on most LoRa boards, using the web flashers. Identity, contacts and settings don't carry over; you set region and preset again.",
			},
			{
				q: 'Which has more range?',
				a: 'Neither inherently. Where the repeaters or routers sit matters more than the protocol.',
			},
			{
				q: 'Which is better?',
				a: 'It depends on the network. MeshCore suits planned networks with repeaters; Meshtastic suits groups without infrastructure. Usually, the best pick is whatever your community already runs.',
			},
			{
				q: 'City or countryside?',
				a: 'In cities, MeshCore keeps airtime low (and Meshtastic 2.8 adds hop scaling for busy meshes). In rural areas with few nodes, Meshtastic needs no fixed infrastructure; MeshCore needs well-placed repeaters to cover long distances.',
			},
			{
				q: 'Is MeshCore free?',
				a: "Yes. The firmware is MIT and the app is free. An optional purchase removes the phone repeater-management timer. The official app isn't open source.",
			},
		],
	},
	cta: {
		title: 'Ready to try MeshCore?',
		body: "If you've made up your mind, set up your radio with the US preset and join the island's channel. If you'd rather run Meshtastic, sister network PRMSH will welcome you.",
		primary: 'Set up your radio',
		sister: 'Go to PRMSH (Meshtastic)',
	},
	sourceHtml: `Facts summarized from ${link(sourceUrl, "NodakMesh's comparison")} (October 2026). MeshCore PR is not affiliated with the MeshCore or Meshtastic projects.`,
};

export const protocolos: Record<Lang, ProtocolosDictionary> = { es, en };
