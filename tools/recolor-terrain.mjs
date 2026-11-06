#!/usr/bin/env node
/**
 * Writes the two terrain themes from public/terrain/puerto-rico.svg, keeping
 * its geometry and mapping its elevation bands, in order, to a colour ramp.
 *   public/terrain/puerto-rico.svg        dark theme
 *   public/terrain/puerto-rico-light.svg  light theme
 * Safe to re-run: bands are ordered by the luminance of the current colours.
 */
import { readFile, writeFile } from 'node:fs/promises';

const file = (name) => new URL(`../public/terrain/${name}`, import.meta.url);
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const hex = (c) => `#${c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
const lum = (h) => {
	const [r, g, b] = rgb(h);
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const mix = (a, b, t) => hex(rgb(a).map((v, i) => v + (rgb(b)[i] - v) * t));

/** [low, high] elevation colours per attribute. */
const themes = {
	'puerto-rico.svg': { fill: ['#182130', '#42536e'], stroke: ['#2c384b', '#70829f'] },
	'puerto-rico-light.svg': { fill: ['#eceff4', '#a9b6c9'], stroke: ['#ced5df', '#74839a'] },
};

const source = await readFile(file('puerto-rico.svg'), 'utf8');

for (const [name, ramps] of Object.entries(themes)) {
	let out = source;
	for (const attr of ['fill', 'stroke']) {
		const found = [...source.matchAll(new RegExp(`${attr}="(#[0-9a-fA-F]{6})"`, 'g'))].map(
			(m) => m[1],
		);
		const bands = [...new Set(found)].sort((a, b) => lum(a) - lum(b));
		const map = new Map(
			bands.map((c, i) => [
				c,
				mix(ramps[attr][0], ramps[attr][1], i / Math.max(1, bands.length - 1)),
			]),
		);
		out = out.replace(
			new RegExp(`${attr}="(#[0-9a-fA-F]{6})"`, 'g'),
			(_, c) => `${attr}="${map.get(c)}"`,
		);
	}
	await writeFile(file(name), out);
}
console.log('terrain themes written');
