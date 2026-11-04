import type { LatLon } from '../lib/map';

/**
 * ILLUSTRATIVE MeshCore network for the hero map. Locations are real places
 * (coordinates shared with prmsh.com's map) chosen to explain how a MeshCore
 * direct message first floods through repeaters and then follows a learned
 * route. They are NOT deployed nodes, measured coverage or working links,
 * and the map says so in its caption.
 */
export interface MapNode extends LatLon {
	id: string;
	label: string;
	/** MeshCore role: companions never relay, repeaters do. */
	kind: 'companion' | 'repeater';
	/** Label placement relative to the point. */
	anchor: 'n' | 's' | 'e' | 'w';
	/** Hide label below the tablet breakpoint to avoid crowding. */
	minor?: boolean;
}

export const nodes: MapNode[] = [
	{
		id: 'mayaguez',
		label: 'Mayagüez',
		lat: 18.2013,
		lon: -67.1397,
		kind: 'companion',
		anchor: 'w',
	},
	{
		id: 'guilarte',
		label: 'Monte Guilarte',
		lat: 18.1453,
		lon: -66.7633,
		kind: 'repeater',
		anchor: 's',
	},
	{
		id: 'punta',
		label: 'Cerro de Punta',
		lat: 18.1717,
		lon: -66.5917,
		kind: 'repeater',
		anchor: 'n',
	},
	{
		id: 'arecibo',
		label: 'Arecibo',
		lat: 18.472,
		lon: -66.716,
		kind: 'companion',
		anchor: 'n',
		minor: true,
	},
	{
		id: 'ponce',
		label: 'Ponce',
		lat: 18.0111,
		lon: -66.6141,
		kind: 'companion',
		anchor: 's',
		minor: true,
	},
	{ id: 'cayey', label: 'Cayey', lat: 18.1119, lon: -66.166, kind: 'repeater', anchor: 's' },
	{
		id: 'yunque',
		label: 'El Yunque',
		lat: 18.3106,
		lon: -65.7914,
		kind: 'repeater',
		anchor: 's',
		minor: true,
	},
	{ id: 'sanjuan', label: 'San Juan', lat: 18.4655, lon: -66.1057, kind: 'companion', anchor: 'n' },
];

/**
 * Flood of the first message from Mayagüez, wave by wave. Each entry is a
 * link heard in that wave; only repeaters transmit after the first wave.
 */
export const flood: { wave: number; link: [string, string] }[] = [
	{ wave: 0, link: ['mayaguez', 'guilarte'] },
	{ wave: 1, link: ['guilarte', 'punta'] },
	{ wave: 2, link: ['punta', 'cayey'] },
	{ wave: 2, link: ['punta', 'arecibo'] },
	{ wave: 2, link: ['punta', 'ponce'] },
	{ wave: 3, link: ['cayey', 'sanjuan'] },
	{ wave: 3, link: ['cayey', 'yunque'] },
];

/** Route returned with the delivery receipt and used from then on. */
export const learnedRoute = ['mayaguez', 'guilarte', 'punta', 'cayey', 'sanjuan'];
