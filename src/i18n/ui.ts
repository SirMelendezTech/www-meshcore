import { linkHtml, pathHtml } from '../config/links';

export const languages = {
	es: 'Español',
	en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

// Root-relative path of each page per locale. Spanish stays at `/`
// (prefixDefaultLocale: false in astro.config.mjs).
export const homePath: Record<Lang, string> = { es: '/', en: '/en/' };
export const protocolsPath: Record<Lang, string> = { es: '/protocolos/', en: '/en/protocols/' };
export const mapPath: Record<Lang, string> = { es: '/mapa/', en: '/en/map/' };

/**
 * Technical facts shown on the home page. Sources:
 * - Radio preset: official list served by https://api.meshcore.nz/api/v1/config
 *   (entry "USA": 910.525 MHz / SF7 / BW62.5 / CR5), as linked from
 *   https://docs.meshcore.io/radio_presets/.
 * - Roles and routing: https://docs.meshcore.io/faq/ and the MeshCore README.
 * - Hardware: the device list on https://meshcore.io/ (November 2026).
 */
const preset = {
	frequency: '910.525 MHz',
	bandwidth: '62.5 kHz',
	sf: 'SF7',
	cr: 'CR 5',
	band: '902–928 MHz',
};

const NEW_TAB_ES = '(abre en una pestaña nueva)';
const NEW_TAB_EN = '(opens in a new tab)';

const es = {
	lang: 'es-PR',
	meta: {
		title: 'MeshCore Puerto Rico | Comunidad PRMSH',
		description:
			'Explora MeshCore en Puerto Rico. Aprende sobre redes mesh LoRa, dispositivos, configuración y recursos para la comunidad.',
		ogLocale: 'es_PR',
		ogImageAlt:
			'Relieve de Puerto Rico con una red conceptual de nodos MeshCore. MeshCore Puerto Rico, parte de la comunidad PRMSH.',
	},
	a11y: {
		skip: 'Saltar al contenido',
		newTab: NEW_TAB_ES,
		menuOpen: 'Abrir menú',
		menuClose: 'Cerrar menú',
		primaryNav: 'Principal',
		footerNav: 'Enlaces de MeshCore Puerto Rico',
		home: 'MeshCore Puerto Rico, inicio',
		parent: 'PRMSH, portal de la comunidad',
	},
	nav: {
		inicio: 'Inicio',
		meshcore: 'MeshCore',
		como: 'Cómo funciona',
		recursos: 'Recursos',
		comunidad: 'Comunidad',
		mapa: 'Mapa',
		comparar: 'Comparar',
		join: 'Unirse a la comunidad',
		back: 'Volver a PRMSH',
	},
	switchTo: { label: 'English', lang: 'en', title: 'Read this page in English' },

	hero: {
		eyebrow: 'PRMSH COMMUNITY / MESHCORE / PUERTO RICO',
		title: 'MeshCore en Puerto Rico.',
		body: 'Explora MeshCore, aprende cómo funcionan sus redes mesh LoRa y conecta con una comunidad puertorriqueña interesada en experimentar con comunicaciones descentralizadas.',
		primary: 'Explorar MeshCore',
		secondary: 'Unirme a la comunidad',
	},
	plate: {
		annotations: ['MESH NETWORK', 'LoRa', 'PUERTO RICO'],
		band: `${preset.band} ISM`,
		label:
			'Mapa de relieve de Puerto Rico con una red conceptual: un mensaje sale de Mayagüez, se inunda por repetidores en la Cordillera Central y llega a San Juan; luego queda marcada la ruta aprendida.',
		regions: {
			cordillera: 'CORDILLERA CENTRAL',
			north: 'Llanos costeros del norte',
			south: 'Llanos costeros del sur',
			luquillo: 'Sierra de Luquillo',
		},
		legendCompanion: 'Companion',
		legendRepeater: 'Repetidor',
		legendFlood: 'Primer envío (inundación)',
		legendPath: 'Ruta aprendida',
		legendContour: 'Curvas de nivel',
		flag: 'Conceptual',
		disclaimer:
			'Ilustración. Los lugares y el relieve son reales (SRTM / USGS 3DEP); los nodos y enlaces no representan equipos instalados, cobertura medida ni la red actual. Para ver nodos reales, usa el mapa en vivo.',
		mapLink: 'Abrir el mapa en vivo',
	},

	explore: {
		title: 'Explora MeshCore.',
		body: 'Conoce el ecosistema MeshCore, sus conceptos de red, los dispositivos compatibles y los recursos disponibles para comenzar a experimentar.',
		aboutHtml: `MeshCore es un sistema de mensajería mesh fuera de la red celular que funciona sobre radios LoRa. Su base es una biblioteca de código abierto en C++ (licencia MIT) para enrutar paquetes a través de varios saltos. En MeshCore solo los repetidores retransmiten: tu radio personal se conecta al teléfono o a la computadora y no repite mensajes ajenos.`,
		notOfficialHtml: `Esta guía la mantiene la comunidad PRMSH; no es el sitio oficial del proyecto. La fuente de referencia es la ${linkHtml('mcDocs', 'documentación oficial de MeshCore', NEW_TAB_ES)}.`,
		featuresTitle: 'Una red. Múltiples posibilidades.',
		features: [
			{
				id: 'network',
				title: 'Redes mesh',
				body: 'Aprende sobre nodos, rutas de comunicación y los conceptos que permiten transmitir mensajes a través de una red.',
				cta: 'Ver cómo viaja un mensaje',
				href: '#como-funciona',
			},
			{
				id: 'devices',
				title: 'Dispositivos y hardware',
				body: 'Descubre equipos compatibles, opciones de hardware, antenas y consideraciones para construir tu propio nodo.',
				cta: 'Ver hardware compatible',
				href: '#hardware',
			},
			{
				id: 'learning',
				title: 'Aprende y experimenta',
				body: 'Encuentra recursos, guías de configuración y explicaciones que faciliten la exploración de MeshCore.',
				cta: 'Ver recursos',
				href: '#recursos',
			},
			{
				id: 'community',
				title: 'Comunidad local',
				body: 'Comparte proyectos, intercambia experiencias y aprende junto a otros entusiastas de las redes mesh en Puerto Rico.',
				cta: 'Ver canales',
				href: '#comunidad',
			},
		],
	},

	how: {
		title: 'Entiende la red, paso a paso.',
		body: 'Una introducción visual a los conceptos esenciales de las comunicaciones mesh.',
		steps: [
			{
				title: 'Conoce los nodos',
				body: 'Descubre los componentes de un nodo y su función dentro de una red MeshCore.',
			},
			{
				title: 'Comprende las conexiones',
				body: 'Aprende cómo se comunican los nodos y cómo funciona el reenvío de mensajes según la arquitectura y configuración de MeshCore.',
			},
			{
				title: 'Experimenta responsablemente',
				body: 'Explora la configuración de dispositivos, la instalación de nodos y las consideraciones de radiofrecuencia.',
			},
		],
		nodeParts:
			'Un nodo es una placa con radio LoRa, su antena y una fuente de energía, con el firmware de MeshCore. El firmware que instalas define su rol:',
		roles: [
			{
				title: 'Companion',
				body: 'Tu radio personal. Se conecta a la app por Bluetooth o a la app web por USB. No retransmite mensajes de otros.',
				guide: 'guiaCompanion' as const,
			},
			{
				title: 'Repetidor',
				body: 'Extiende el alcance de todos retransmitiendo paquetes. Rinde más en un punto alto. Se configura por USB o a distancia desde la app.',
				guide: 'guiaRepeater' as const,
			},
			{
				title: 'Room server',
				body: 'Un tablón compartido, al estilo BBS. Guarda publicaciones y, al entrar, te entrega hasta 32 mensajes que no has visto.',
				guide: 'guiaRepeater' as const,
			},
		],
		guideLink: 'Guía de configuración',
		stepper: {
			title: 'Un mensaje directo, de A a B',
			prev: 'Anterior',
			next: 'Siguiente',
			reset: 'Reiniciar',
			stepOf: 'Paso {n} de {total}',
			steps: [
				{
					name: 'Primer envío',
					body: 'A todavía no conoce una ruta hacia B, así que el mensaje se inunda: cada repetidor que lo oye lo retransmite una vez. C es un companion y no retransmite.',
				},
				{
					name: 'Acuse con ruta',
					body: 'B responde con un acuse de entrega que incluye los repetidores por donde pasó el mensaje. A guarda esa ruta con el contacto de B.',
				},
				{
					name: 'Mensajes siguientes',
					body: 'Los próximos mensajes llevan la ruta. Solo retransmite el repetidor que aparece en ella; los demás lo oyen y se quedan callados.',
				},
				{
					name: 'Si la ruta se rompe',
					body: 'Si un repetidor de la ruta desaparece, el mensaje falla. Tras 3 intentos, la app borra la ruta y vuelve a inundar (opción activada por defecto).',
				},
			],
			legendCompanion: 'Companion',
			legendRepeater: 'Repetidor',
			legendTx: 'Transmite',
			legendQuiet: 'Lo oye, no retransmite',
			pathLabel: 'Ruta guardada',
			noPath: 'sin ruta',
			flag: 'Diagrama conceptual',
			sourceHtml: `Basado en la ${linkHtml('mcFaq', 'FAQ oficial de MeshCore', NEW_TAB_ES)}. Los mensajes de canal no tienen destino fijo y siempre se inundan.`,
		},
		presetLabel: 'Preset de radio «USA»',
		specs: [
			{ k: 'Frecuencia', v: preset.frequency },
			{ k: 'Ancho de banda', v: preset.bandwidth },
			{ k: 'Factor de dispersión', v: preset.sf },
			{ k: 'Tasa de codificación', v: preset.cr },
			{ k: 'Banda', v: `${preset.band} ISM` },
		],
		islandLabel: 'Ajuste de la malla de la isla',
		island: { k: 'Path hash', v: '2 bytes' },
		presetNoteHtml: `Valores del preset «USA» de la lista oficial de MeshCore. La malla de Puerto Rico añade el path hash de 2 bytes para que dos repetidores no compartan el mismo identificador; lo explica la ${linkHtml('guiaCompanion', 'guía de Companion', NEW_TAB_ES)}. Confírmalos en la app antes de transmitir: pueden cambiar.`,
		responsible: [
			{
				title: 'Usa hardware de 915 MHz',
				body: 'Puerto Rico está bajo la FCC y usa la banda ISM de 902–928 MHz. Las versiones de 868 o 433 MHz no sirven aquí.',
			},
			{
				title: 'Conecta la antena antes de encender',
				body: 'Transmitir sin antena puede dañar el radio. Usa una antena hecha para 915 MHz.',
			},
			{
				title: 'Repetidores con permiso',
				body: 'Instala repetidores solo donde tengas autorización y coordina la ubicación con la comunidad para no duplicar cobertura.',
			},
			{
				title: 'No reemplaza al 911',
				body: 'MeshCore es experimental y comunitario. En una emergencia, llama al 911.',
			},
		],
	},

	resources: {
		title: 'Recursos para comenzar.',
		body: 'Accede a documentación y herramientas que te ayuden a entender y utilizar MeshCore.',
		thirdParty: 'Terceros',
		official: 'Oficial',
		guides: {
			title: 'Guías de la malla de Puerto Rico',
			body: 'Paso a paso para configurar tu nodo con los valores de la isla. Las escribe y mantiene la comunidad PRMSH.',
			open: 'Abrir guía',
			all: 'Ver todas las guías',
			items: [
				{
					id: 'guiaCompanion' as const,
					label: 'Companion',
					body: 'Nodo portátil conectado a tu teléfono por BLE, USB o WiFi.',
				},
				{
					id: 'guiaRepeater' as const,
					label: 'Repeater y Room Server',
					body: 'Infraestructura fija: el repeater extiende la cobertura y el room server guarda mensajes para un grupo.',
				},
			],
		},
		groups: [
			{
				id: 'documentation',
				title: 'Documentación oficial',
				body: 'Manuales, guías y documentación técnica del proyecto.',
				items: [
					{ id: 'mcDocs', label: 'Documentación de MeshCore' },
					{ id: 'mcFaq', label: 'Preguntas frecuentes (FAQ)' },
					{ id: 'mcCli', label: 'Comandos para repetidores y room servers' },
					{ id: 'mcGithub', label: 'Código fuente en GitHub' },
				],
			},
			{
				id: 'getting-started',
				title: 'Primeros pasos',
				body: 'Herramientas para instalar el firmware, configurar dispositivos y comenzar a experimentar.',
				items: [
					{ id: 'mcFlasher', label: 'Flasher web: instala el firmware por USB' },
					{ id: 'mcSite', label: 'Apps para Android, iOS y escritorio' },
					{ id: 'mcWebApp', label: 'App web para companions por USB' },
					{ id: 'mcConfig', label: 'Configurador web de repetidores' },
					{
						id: 'meshcoreOne',
						label: 'MeshCore One, cliente para iPhone, iPad y Mac',
						thirdParty: true,
					},
				],
			},
		],
		hardware: {
			title: 'Hardware compatible',
			body: 'Equipos que el proyecto MeshCore lista en meshcore.io. Compra siempre la variante de 915 MHz.',
			groups: [
				{
					role: 'Companion',
					devices: [
						'Heltec V3',
						'RAK WisMesh Pocket',
						'RAK WisMesh Tag',
						'Seeed Wio Tracker L1 Pro',
						'Elecrow ThinkNode M1',
					],
				},
				{ role: 'Repetidor', devices: ['Seeed SenseCAP Solar Node P1 Pro'] },
				{
					role: 'Independiente, sin teléfono',
					devices: [
						'LilyGO T-Deck Plus',
						'LilyGO T-Deck Pro',
						'LilyGO T-LoRa Pager',
						'LilyGO T-Watch S3 Plus',
					],
				},
			],
			moreHtml: `No es una lista completa: el ${linkHtml('mcFlasher', 'flasher oficial', NEW_TAB_ES)} muestra todas las placas que pueden recibir el firmware. Que un equipo use LoRa no significa que sea compatible con MeshCore.`,
		},
		onSite: {
			title: 'En este sitio',
			items: [
				{
					key: 'mapa',
					label: 'Mapa en vivo de la red',
					body: 'Nodos MeshCore oídos en la isla, vía CoreScope.',
				},
				{
					key: 'comparar',
					label: 'MeshCore y Meshtastic',
					body: 'Diferencias entre los dos protocolos y cuál te conviene.',
				},
			],
		},
	},

	community: {
		title: 'Construyamos la comunidad.',
		body: 'La tecnología es solo una parte de la red. Comparte tus experiencias, resuelve dudas y conecta con otros entusiastas de Puerto Rico.',
		scope:
			'Estos canales son de toda la comunidad PRMSH, que reúne a usuarios de MeshCore y de Meshtastic. No son exclusivos de MeshCore.',
		channels: {
			discord: {
				name: 'Discord',
				body: 'Conversaciones, ayuda y colaboración entre miembros. Aquí se comparten los datos del canal MeshCore de la isla.',
				cta: 'Unirme a Discord',
			},
			facebook: {
				name: 'Facebook',
				body: 'Participa en las conversaciones de la comunidad.',
				cta: 'Visitar grupo',
			},
			reddit: {
				name: 'Reddit',
				body: 'Comparte preguntas y experiencias sobre Meshtastic en Puerto Rico.',
				cta: 'Visitar subreddit',
			},
		},
		join: {
			title: 'Para entrar a la red MeshCore de la isla',
			steps: [
				`Configura tu radio siguiendo la ${linkHtml('guiaCompanion', 'guía de Companion', NEW_TAB_ES)}.`,
				'Pide en Discord el canal público vigente. No lo publicamos aquí para que nunca quede desactualizado.',
				'Agrégalo en tu app y saluda.',
				'Si montas un repetidor, avisa dónde quedó para coordinar la cobertura.',
			],
		},
	},

	closing: {
		title: 'La próxima conexión comienza contigo.',
		body: 'Explora MeshCore, comparte lo que aprendes y forma parte de la comunidad de redes mesh de Puerto Rico.',
		resources: 'Explorar recursos',
		discord: 'Unirme a Discord',
		back: 'Volver a PRMSH',
	},

	footer: {
		description:
			'Un espacio para aprender, experimentar y conectar alrededor de MeshCore en Puerto Rico.',
		family: 'PRMSH',
		guides: 'Guías de nodos',
		site: 'Este sitio',
		community: 'Comunidad',
		legal:
			'MeshCore Puerto Rico es parte de PRMSH, un portal comunitario independiente. No es el sitio oficial de MeshCore ni está afiliado ni respaldado por MeshCore Technologies Ltd o los desarrolladores de MeshCore. El logo de MeshCore es marca registrada de MeshCore Technologies Ltd. Meshtastic® es marca registrada de Meshtastic LLC.',
		emergency: 'No es un servicio de emergencia. En una emergencia, llama al 911.',
		rights: 'PRMSH',
		source: 'Código fuente',
	},

	mapa: {
		meta: {
			title: 'Mapa en vivo de la red | MeshCore Puerto Rico',
			description:
				'Mapa en vivo de los nodos y repetidores MeshCore en Puerto Rico, servido por CoreScope. Mira dónde hay cobertura y abre CoreScope para ver paquetes, rutas y canales.',
		},
		eyebrow: 'MESHCORE / PUERTO RICO / EN VIVO',
		title: 'Mapa de la red en vivo',
		lead: 'Nodos y repetidores MeshCore que se han escuchado en Puerto Rico. Los datos vienen de CoreScope, el monitor de la red que corre la comunidad.',
		open: 'Abrir CoreScope',
		howLink: 'Cómo sale tu nodo en el mapa',
		skipMap: 'Saltar el mapa',
		frameTitle: 'Mapa en vivo de nodos MeshCore en Puerto Rico (CoreScope)',
		caption: 'Arrastra para moverte y usa la rueda o dos dedos para hacer zoom. ¿No carga?',
		captionLink: 'Ábrelo directo en CoreScope',
		how: {
			title: 'Cómo sale tu nodo en el mapa',
			intro:
				'CoreScope escucha la red a través de observadores: radios conectados a internet que reportan los paquetes que oyen.',
			items: [
				{
					title: 'Tu nodo tiene que anunciarse',
					desc: 'Cada nodo manda un anuncio (advert) con su nombre y, si se lo configuraste, su ubicación. Sin ubicación, el nodo existe en CoreScope pero no sale en el mapa.',
				},
				{
					title: 'Un observador tiene que oírlo',
					desc: 'Si ningún observador queda a tu alcance, ni directo ni a través de repetidores, CoreScope no se entera. Más repetidores en alto significa un mapa más completo.',
				},
				{
					title: 'Tú decides cuánto mostrar',
					desc: 'La ubicación es opcional. Si no quieres que se vea dónde está tu radio, déjala en blanco o usa un punto aproximado del barrio.',
				},
			],
			more: 'En CoreScope también puedes ver paquetes en tiempo real, rutas entre nodos y estadísticas de la red.',
		},
	},
};

export type Dictionary = typeof es;

const en: Dictionary = {
	lang: 'en',
	meta: {
		title: 'MeshCore Puerto Rico | PRMSH Community',
		description:
			'Explore MeshCore in Puerto Rico. Learn about LoRa mesh networks, devices, setup and resources for the community.',
		ogLocale: 'en_US',
		ogImageAlt:
			'Relief map of Puerto Rico with a conceptual network of MeshCore nodes. MeshCore Puerto Rico, part of the PRMSH community.',
	},
	a11y: {
		skip: 'Skip to content',
		newTab: NEW_TAB_EN,
		menuOpen: 'Open menu',
		menuClose: 'Close menu',
		primaryNav: 'Main',
		footerNav: 'MeshCore Puerto Rico links',
		home: 'MeshCore Puerto Rico, home',
		parent: 'PRMSH, community portal',
	},
	nav: {
		inicio: 'Home',
		meshcore: 'MeshCore',
		como: 'How it works',
		recursos: 'Resources',
		comunidad: 'Community',
		mapa: 'Map',
		comparar: 'Compare',
		join: 'Join the community',
		back: 'Back to PRMSH',
	},
	switchTo: { label: 'Español', lang: 'es', title: 'Leer esta página en español' },

	hero: {
		eyebrow: 'PRMSH COMMUNITY / MESHCORE / PUERTO RICO',
		title: 'MeshCore in Puerto Rico.',
		body: 'Explore MeshCore, learn how its LoRa mesh networks work and connect with a Puerto Rican community experimenting with decentralized communications.',
		primary: 'Explore MeshCore',
		secondary: 'Join the community',
	},
	plate: {
		annotations: ['MESH NETWORK', 'LoRa', 'PUERTO RICO'],
		band: `${preset.band} ISM`,
		label:
			'Relief map of Puerto Rico with a conceptual network: a message leaves Mayagüez, floods through repeaters along the Cordillera Central and reaches San Juan; the learned route is then marked.',
		regions: {
			cordillera: 'CORDILLERA CENTRAL',
			north: 'Northern coastal plains',
			south: 'Southern coastal plains',
			luquillo: 'Sierra de Luquillo',
		},
		legendCompanion: 'Companion',
		legendRepeater: 'Repeater',
		legendFlood: 'First send (flood)',
		legendPath: 'Learned route',
		legendContour: 'Contour lines',
		flag: 'Conceptual',
		disclaimer:
			'Illustration. Places and relief are real (SRTM / USGS 3DEP); the nodes and links do not represent installed equipment, measured coverage or the current network. To see real nodes, use the live map.',
		mapLink: 'Open the live map',
	},

	explore: {
		title: 'Explore MeshCore.',
		body: 'Get to know the MeshCore ecosystem, its networking concepts, compatible devices and the resources available to start experimenting.',
		aboutHtml: `MeshCore is an off-grid mesh messaging system that runs over LoRa radios. At its core is an open-source C++ library (MIT license) for routing packets across multiple hops. In MeshCore only repeaters relay: your personal radio connects to your phone or computer and does not repeat other people's messages.`,
		notOfficialHtml: `This guide is maintained by the PRMSH community; it is not the project's official site. The reference source is the ${linkHtml('mcDocs', 'official MeshCore documentation', NEW_TAB_EN)}.`,
		featuresTitle: 'One network. Many possibilities.',
		features: [
			{
				id: 'network',
				title: 'Mesh networks',
				body: 'Learn about nodes, communication routes and the concepts that let messages travel across a network.',
				cta: 'See how a message travels',
				href: '#como-funciona',
			},
			{
				id: 'devices',
				title: 'Devices and hardware',
				body: 'Discover compatible devices, hardware options, antennas and what to consider when building your own node.',
				cta: 'See compatible hardware',
				href: '#hardware',
			},
			{
				id: 'learning',
				title: 'Learn and experiment',
				body: 'Find resources, setup guides and explanations that make exploring MeshCore easier.',
				cta: 'See resources',
				href: '#recursos',
			},
			{
				id: 'community',
				title: 'Local community',
				body: 'Share projects, trade experiences and learn alongside other mesh networking enthusiasts in Puerto Rico.',
				cta: 'See channels',
				href: '#comunidad',
			},
		],
	},

	how: {
		title: 'Understand the network, step by step.',
		body: 'A visual introduction to the essential concepts of mesh communications.',
		steps: [
			{
				title: 'Meet the nodes',
				body: 'Discover the parts of a node and its role within a MeshCore network.',
			},
			{
				title: 'Understand the connections',
				body: "Learn how nodes talk to each other and how message forwarding works under MeshCore's architecture and settings.",
			},
			{
				title: 'Experiment responsibly',
				body: 'Explore device setup, node installation and radio frequency considerations.',
			},
		],
		nodeParts:
			'A node is a board with a LoRa radio, its antenna and a power source, running MeshCore firmware. The firmware you install sets its role:',
		roles: [
			{
				title: 'Companion',
				body: "Your personal radio. It connects to the app over Bluetooth or to the web app over USB. It doesn't relay other people's messages.",
				guide: 'guiaCompanion' as const,
			},
			{
				title: 'Repeater',
				body: "Extends everyone's range by relaying packets. Works best on high ground. Configured over USB or remotely from the app.",
				guide: 'guiaRepeater' as const,
			},
			{
				title: 'Room server',
				body: "A shared, BBS-style board. It stores posts and, when you log in, delivers up to 32 messages you haven't seen.",
				guide: 'guiaRepeater' as const,
			},
		],
		guideLink: 'Setup guide (in Spanish)',
		stepper: {
			title: 'One direct message, from A to B',
			prev: 'Previous',
			next: 'Next',
			reset: 'Reset',
			stepOf: 'Step {n} of {total}',
			steps: [
				{
					name: 'First send',
					body: "A doesn't know a route to B yet, so the message floods: every repeater that hears it relays it once. C is a companion and doesn't relay.",
				},
				{
					name: 'Receipt with route',
					body: 'B answers with a delivery receipt that lists the repeaters the message went through. A saves that route with B’s contact.',
				},
				{
					name: 'Later messages',
					body: 'Later messages carry the route. Only the repeaters listed in it relay; the others hear it and stay quiet.',
				},
				{
					name: 'If the route breaks',
					body: 'If a repeater on the route disappears, the message fails. After 3 attempts the app clears the route and floods again (on by default).',
				},
			],
			legendCompanion: 'Companion',
			legendRepeater: 'Repeater',
			legendTx: 'Transmits',
			legendQuiet: 'Hears it, does not relay',
			pathLabel: 'Saved route',
			noPath: 'no route',
			flag: 'Conceptual diagram',
			sourceHtml: `Based on the ${linkHtml('mcFaq', 'official MeshCore FAQ', NEW_TAB_EN)}. Channel messages have no fixed destination and always flood.`,
		},
		presetLabel: '“USA” radio preset',
		specs: [
			{ k: 'Frequency', v: preset.frequency },
			{ k: 'Bandwidth', v: preset.bandwidth },
			{ k: 'Spreading factor', v: preset.sf },
			{ k: 'Coding rate', v: preset.cr },
			{ k: 'Band', v: `${preset.band} ISM` },
		],
		islandLabel: 'Island mesh setting',
		island: { k: 'Path hash', v: '2 bytes' },
		presetNoteHtml: `Values of the “USA” preset from MeshCore’s official list. Puerto Rico’s mesh adds a 2-byte path hash so no two repeaters share the same identifier; the ${linkHtml('guiaCompanion', 'Companion guide', NEW_TAB_EN)} (in Spanish) explains why. Confirm them in the app before transmitting: they can change.`,
		responsible: [
			{
				title: 'Use 915 MHz hardware',
				body: "Puerto Rico falls under the FCC and uses the 902–928 MHz ISM band. 868 or 433 MHz versions won't work here.",
			},
			{
				title: 'Attach the antenna before powering on',
				body: 'Transmitting without an antenna can damage the radio. Use an antenna made for 915 MHz.',
			},
			{
				title: 'Repeaters with permission',
				body: 'Only install repeaters where you have permission, and coordinate the location with the community to avoid duplicate coverage.',
			},
			{
				title: 'Not a replacement for 911',
				body: 'MeshCore is experimental and community-run. In an emergency, call 911.',
			},
		],
	},

	resources: {
		title: 'Resources to get started.',
		body: 'Documentation and tools to help you understand and use MeshCore.',
		thirdParty: 'Third party',
		official: 'Official',
		guides: {
			title: "Guides for Puerto Rico's mesh",
			body: 'Step-by-step setup for your node with the island’s settings. Written and maintained by the PRMSH community, in Spanish.',
			open: 'Open guide',
			all: 'See all guides',
			items: [
				{
					id: 'guiaCompanion' as const,
					label: 'Companion',
					body: 'Portable node connected to your phone over BLE, USB or Wi-Fi.',
				},
				{
					id: 'guiaRepeater' as const,
					label: 'Repeater and Room Server',
					body: 'Fixed infrastructure: the repeater extends coverage and the room server stores messages for a group.',
				},
			],
		},
		groups: [
			{
				id: 'documentation',
				title: 'Official documentation',
				body: "The project's manuals, guides and technical documentation.",
				items: [
					{ id: 'mcDocs', label: 'MeshCore documentation' },
					{ id: 'mcFaq', label: 'Frequently asked questions (FAQ)' },
					{ id: 'mcCli', label: 'Commands for repeaters and room servers' },
					{ id: 'mcGithub', label: 'Source code on GitHub' },
				],
			},
			{
				id: 'getting-started',
				title: 'First steps',
				body: 'Tools to install the firmware, set up devices and start experimenting.',
				items: [
					{ id: 'mcFlasher', label: 'Web flasher: install firmware over USB' },
					{ id: 'mcSite', label: 'Apps for Android, iOS and desktop' },
					{ id: 'mcWebApp', label: 'Web app for USB companions' },
					{ id: 'mcConfig', label: 'Web repeater configurator' },
					{
						id: 'meshcoreOne',
						label: 'MeshCore One, client for iPhone, iPad and Mac',
						thirdParty: true,
					},
				],
			},
		],
		hardware: {
			title: 'Compatible hardware',
			body: 'Devices the MeshCore project lists on meshcore.io. Always buy the 915 MHz variant.',
			groups: [
				{
					role: 'Companion',
					devices: [
						'Heltec V3',
						'RAK WisMesh Pocket',
						'RAK WisMesh Tag',
						'Seeed Wio Tracker L1 Pro',
						'Elecrow ThinkNode M1',
					],
				},
				{ role: 'Repeater', devices: ['Seeed SenseCAP Solar Node P1 Pro'] },
				{
					role: 'Standalone, no phone',
					devices: [
						'LilyGO T-Deck Plus',
						'LilyGO T-Deck Pro',
						'LilyGO T-LoRa Pager',
						'LilyGO T-Watch S3 Plus',
					],
				},
			],
			moreHtml: `This is not a complete list: the ${linkHtml('mcFlasher', 'official flasher', NEW_TAB_EN)} shows every board that can take the firmware. A device using LoRa doesn't make it MeshCore-compatible.`,
		},
		onSite: {
			title: 'On this site',
			items: [
				{
					key: 'mapa',
					label: 'Live network map',
					body: 'MeshCore nodes heard on the island, via CoreScope.',
				},
				{
					key: 'comparar',
					label: 'MeshCore and Meshtastic',
					body: 'How the two protocols differ and which one fits you.',
				},
			],
		},
	},

	community: {
		title: "Let's build the community.",
		body: 'Technology is only part of the network. Share your experiences, get answers and connect with other enthusiasts in Puerto Rico.',
		scope:
			'These channels belong to the whole PRMSH community, which brings together MeshCore and Meshtastic users. They are not MeshCore-only.',
		channels: {
			discord: {
				name: 'Discord',
				body: "Conversations, help and collaboration between members. This is where the island's MeshCore channel details are shared.",
				cta: 'Join Discord',
			},
			facebook: {
				name: 'Facebook',
				body: "Take part in the community's conversations.",
				cta: 'Visit group',
			},
			reddit: {
				name: 'Reddit',
				body: 'Share questions and experiences about Meshtastic in Puerto Rico.',
				cta: 'Visit subreddit',
			},
		},
		join: {
			title: "To join the island's MeshCore network",
			steps: [
				`Set up your radio following the ${linkHtml('guiaCompanion', 'Companion guide', NEW_TAB_EN)} (in Spanish).`,
				"Ask on Discord for the current public channel. We don't post it here so it never goes stale.",
				'Add it in your app and say hello.',
				'If you put up a repeater, share where it is so coverage can be coordinated.',
			],
		},
	},

	closing: {
		title: 'The next connection starts with you.',
		body: "Explore MeshCore, share what you learn and become part of Puerto Rico's mesh networking community.",
		resources: 'Explore resources',
		discord: 'Join Discord',
		back: 'Back to PRMSH',
	},

	footer: {
		description: 'A place to learn, experiment and connect around MeshCore in Puerto Rico.',
		family: 'PRMSH',
		guides: 'Node guides',
		site: 'This site',
		community: 'Community',
		legal:
			'MeshCore Puerto Rico is part of PRMSH, an independent community portal. It is not the official MeshCore site and is not affiliated with or endorsed by MeshCore Technologies Ltd or the MeshCore developers. The MeshCore logo is a registered trademark of MeshCore Technologies Ltd. Meshtastic® is a registered trademark of Meshtastic LLC.',
		emergency: 'Not an emergency service. In an emergency, call 911.',
		rights: 'PRMSH',
		source: 'Source code',
	},

	mapa: {
		meta: {
			title: 'Live network map | MeshCore Puerto Rico',
			description:
				'Live map of MeshCore nodes and repeaters in Puerto Rico, served by CoreScope. See where there is coverage and open CoreScope for packets, routes and channels.',
		},
		eyebrow: 'MESHCORE / PUERTO RICO / LIVE',
		title: 'Live network map',
		lead: 'MeshCore nodes and repeaters heard in Puerto Rico. The data comes from CoreScope, the network monitor run by the community.',
		open: 'Open CoreScope',
		howLink: 'How your node shows up on the map',
		skipMap: 'Skip the map',
		frameTitle: 'Live map of MeshCore nodes in Puerto Rico (CoreScope)',
		caption: 'Drag to move around and use the scroll wheel or two fingers to zoom. Not loading?',
		captionLink: 'Open it directly in CoreScope',
		how: {
			title: 'How your node shows up on the map',
			intro:
				'CoreScope listens to the network through observers: internet-connected radios that report the packets they hear.',
			items: [
				{
					title: 'Your node has to advertise',
					desc: "Every node sends an advert with its name and, if you set one, its location. Without a location the node still exists in CoreScope but doesn't appear on the map.",
				},
				{
					title: 'An observer has to hear it',
					desc: 'If no observer is within reach, directly or through repeaters, CoreScope never finds out. More repeaters up high means a more complete map.',
				},
				{
					title: 'You decide how much to show',
					desc: "Location is optional. If you don't want your radio's position visible, leave it blank or use an approximate spot in your neighborhood.",
				},
			],
			more: 'CoreScope also shows live packets, routes between nodes and network statistics.',
		},
	},
};

export const ui: Record<Lang, Dictionary> = { es, en };

export { pathHtml };
