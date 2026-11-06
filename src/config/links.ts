/**
 * Every external destination on the site lives here. Components and
 * translated strings import from this module; never hard-code these URLs
 * elsewhere. Shape mirrors portada-prmsh/src/config/links.ts.
 *
 * MeshCore URLs were checked against meshcore.io, docs.meshcore.io and
 * github.com/meshcore-dev/MeshCore (November 2026).
 */

export type LinkId =
	// PRMSH family
	| 'prmsh'
	| 'meshtastic'
	| 'meshcore'
	| 'guia'
	| 'guiaCompanion'
	| 'guiaRepeater'
	| 'corescope'
	// Community channels (shared by all of PRMSH)
	| 'discord'
	| 'facebook'
	| 'reddit'
	// Official MeshCore project
	| 'mcSite'
	| 'mcDocs'
	| 'mcFaq'
	| 'mcCli'
	| 'mcGithub'
	| 'mcFlasher'
	| 'mcWebApp'
	| 'mcConfig'
	// Third-party
	| 'meshcoreOne';

export interface Destination {
	id: LinkId;
	url: `https://${string}`;
	/** Hostname + path shown as a technical annotation. */
	display: string;
	/** Off-site (third-party) links open in a new tab. PRMSH subsites do not. */
	external: boolean;
}

export const links = {
	prmsh: { id: 'prmsh', url: 'https://prmsh.com/', display: 'prmsh.com', external: false },
	meshtastic: {
		id: 'meshtastic',
		url: 'https://meshtastic.prmsh.com/',
		display: 'meshtastic.prmsh.com',
		external: false,
	},
	meshcore: {
		id: 'meshcore',
		url: 'https://meshcore.prmsh.com/',
		display: 'meshcore.prmsh.com',
		external: false,
	},
	// Node setup guides for the island mesh (Spanish only). Hash-routed pages.
	guia: { id: 'guia', url: 'https://guia.prmsh.com/', display: 'guia.prmsh.com', external: false },
	guiaCompanion: {
		id: 'guiaCompanion',
		url: 'https://guia.prmsh.com/#/meshcore-companion-pr.md',
		display: 'guia.prmsh.com',
		external: false,
	},
	guiaRepeater: {
		id: 'guiaRepeater',
		url: 'https://guia.prmsh.com/#/meshcore-repeater-roomserver-pr.md',
		display: 'guia.prmsh.com',
		external: false,
	},
	corescope: {
		id: 'corescope',
		url: 'https://corescope.prmsh.com/',
		display: 'corescope.prmsh.com',
		external: true,
	},
	discord: {
		id: 'discord',
		url: 'https://discord.gg/3v6rRhNRpD',
		display: 'discord.gg/3v6rRhNRpD',
		external: true,
	},
	facebook: {
		id: 'facebook',
		url: 'https://www.facebook.com/groups/3150733368394141/',
		display: 'facebook.com/groups/3150733368394141',
		external: true,
	},
	reddit: {
		id: 'reddit',
		url: 'https://www.reddit.com/r/MeshtasticPuertoRico/',
		display: 'r/MeshtasticPuertoRico',
		external: true,
	},
	mcSite: { id: 'mcSite', url: 'https://meshcore.io/', display: 'meshcore.io', external: true },
	mcDocs: {
		id: 'mcDocs',
		url: 'https://docs.meshcore.io/',
		display: 'docs.meshcore.io',
		external: true,
	},
	mcFaq: {
		id: 'mcFaq',
		url: 'https://docs.meshcore.io/faq/',
		display: 'docs.meshcore.io/faq',
		external: true,
	},
	mcCli: {
		id: 'mcCli',
		url: 'https://docs.meshcore.io/cli_commands/',
		display: 'docs.meshcore.io/cli_commands',
		external: true,
	},
	mcGithub: {
		id: 'mcGithub',
		url: 'https://github.com/meshcore-dev/MeshCore',
		display: 'github.com/meshcore-dev/MeshCore',
		external: true,
	},
	mcFlasher: {
		id: 'mcFlasher',
		url: 'https://meshcore.io/flasher',
		display: 'meshcore.io/flasher',
		external: true,
	},
	mcWebApp: {
		id: 'mcWebApp',
		url: 'https://app.meshcore.nz/',
		display: 'app.meshcore.nz',
		external: true,
	},
	mcConfig: {
		id: 'mcConfig',
		url: 'https://config.meshcore.io/',
		display: 'config.meshcore.io',
		external: true,
	},
	meshcoreOne: {
		id: 'meshcoreOne',
		url: 'https://meshcoreone.com/',
		display: 'meshcoreone.com',
		external: true,
	},
} as const satisfies Record<LinkId, Destination>;

/** Attributes for an anchor pointing at a destination. */
export function linkAttrs(id: LinkId) {
	const d: Destination = links[id];
	return d.external
		? { href: d.url, target: '_blank', rel: 'noopener noreferrer' }
		: { href: d.url };
}

/** Same, as an HTML string, for links inside translated copy rendered with set:html. */
export function linkHtml(id: LinkId, text: string, newTab: string) {
	const d: Destination = links[id];
	return d.external
		? `<a class="inline-link" href="${d.url}" target="_blank" rel="noopener noreferrer">${text}<span class="visually-hidden"> ${newTab}</span></a>`
		: `<a class="inline-link" href="${d.url}">${text}</a>`;
}

/** Internal (same-site) link inside translated copy. */
export function pathHtml(href: string, text: string) {
	return `<a class="inline-link" href="${href}">${text}</a>`;
}

export const site = {
	url: 'https://meshcore.prmsh.com/',
	name: 'MeshCore Puerto Rico',
	parent: 'PRMSH',
	parentDescriptor: 'Puerto Rico Mesh Network Community',
} as const;

/** Ackee: self-hosted, cookie-free visit counts. Loaded in production builds only. */
export const ackee = {
	server: 'https://meshcore-ackee-7307a6-196-12-191-109.sslip.io',
	domainId: '3a5cc6ea-5627-4353-ae4f-494072b01055',
} as const;

/** CoreScope's embed mode hides its own navigation; only #/map and #/channels support it. */
export const coreScopeEmbedUrl = (theme: 'dark' | 'light') =>
	`${links.corescope.url}#/map?embed=1&theme=${theme}`;
