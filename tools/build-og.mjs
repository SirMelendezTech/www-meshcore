#!/usr/bin/env node
/**
 * Builds public/og.png (1200×630) and the PWA icons from site assets.
 *
 * The social card reuses the hero's terrain art and the same illustrative
 * learned route, so shared links look like the page. Text is set in the
 * site fonts; point fontconfig at TTF copies of them before running, e.g.
 *   FONTCONFIG_FILE=/path/fonts.conf node tools/build-og.mjs
 * (Bricolage Grotesque, Atkinson Hyperlegible Next, IBM Plex Mono).
 */
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const frame = JSON.parse(await readFile(new URL('src/data/map-frame.json', root), 'utf8'));
const terrain = await readFile(new URL('public/terrain/puerto-rico.svg', root));

const project = (lat, lon) => {
	const x = ((lon + 180) / 360) * frame.world - frame.origin.x;
	const r = (lat * Math.PI) / 180;
	const y =
		((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * frame.world - frame.origin.y;
	return [x * frame.scale, y * frame.scale];
};

// Same places as src/data/illustrative-network.ts (learned route + repeaters).
const route = [
	[18.2013, -67.1397],
	[18.1453, -66.7633],
	[18.1717, -66.5917],
	[18.1119, -66.166],
	[18.4655, -66.1057],
].map(([a, b]) => project(a, b));
const repeaters = new Set([1, 2, 3]);

const W = 1200;
const H = 630;
const mapW = 780;
const k = mapW / frame.width;
const mapH = frame.height * k;
const mx = W - mapW - 36;
const my = H - mapH - 44;
const P = route.map(([x, y]) => [mx + x * k, my + y * k]);

const nodes = P.map(([x, y], i) =>
	repeaters.has(i)
		? `<rect x="${x - 7}" y="${y - 7}" width="14" height="14" fill="#0B0D0C" stroke="#65C8B0" stroke-width="3"/>`
		: `<circle cx="${x}" cy="${y}" r="7" fill="#0B0D0C" stroke="#65C8B0" stroke-width="3"/>`,
).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
	<rect width="${W}" height="${H}" fill="#0B0D0C"/>
	<image x="${mx}" y="${my}" width="${mapW}" height="${mapH}" opacity="0.9"
		href="data:image/svg+xml;base64,${terrain.toString('base64')}"/>
	<polyline points="${P.map((p) => p.join(',')).join(' ')}" fill="none" stroke="#B7F36B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
	${nodes}
	<g transform="translate(64 58) scale(1.5)">
		<path d="M3 25.5c4.5-3.2 8-4.6 13-4.6s8.5 1.4 13 4.6" stroke="#4a5a4e" stroke-width="1.6" stroke-linecap="round" fill="none"/>
		<path d="M6 19 16 7.5 26 15" stroke="#65C8B0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
		<circle cx="6" cy="19" r="3" fill="#0B0D0C" stroke="#65C8B0" stroke-width="1.8"/>
		<circle cx="26" cy="15" r="3" fill="#0B0D0C" stroke="#65C8B0" stroke-width="1.8"/>
		<circle cx="16" cy="7.5" r="3.4" fill="#B7F36B"/>
	</g>
	<text x="126" y="92" font-family="Bricolage Grotesque" font-weight="700" font-size="30" fill="#F0F2E9">PRMSH <tspan fill="#5f6f63">/</tspan> MeshCore Puerto Rico</text>
	<text x="64" y="166" font-family="IBM Plex Mono" font-size="20" fill="#65C8B0" letter-spacing="0.5">PRMSH COMMUNITY / MESHCORE / PUERTO RICO</text>
	<text x="60" y="250" font-family="Bricolage Grotesque" font-weight="700" font-size="88" fill="#F0F2E9" letter-spacing="-2">MeshCore en Puerto Rico.</text>
	<text x="64" y="298" font-family="Atkinson Hyperlegible Next" font-size="26" fill="#A1AAA0">Redes mesh LoRa, dispositivos, configuración y comunidad.</text>
	<text x="64" y="${H - 40}" font-family="IBM Plex Mono" font-size="16" fill="#A1AAA0">meshcore.prmsh.com · Ilustración conceptual</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(new URL('public/og.png', root).pathname);

const icon = await readFile(new URL('public/favicon.svg', root));
for (const size of [192, 512]) {
	await sharp(icon, { density: 1200 })
		.resize(size, size)
		.flatten({ background: '#0B0D0C' })
		.png()
		.toFile(new URL(`public/icon-${size}.png`, root).pathname);
}
console.log('og.png and icons written');
