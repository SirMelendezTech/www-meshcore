<script lang="ts">
	/**
	 * Steps through one MeshCore direct message: the first send floods,
	 * the delivery receipt brings back a route, later messages follow it,
	 * and a broken route falls back to flooding. Behaviour as described in
	 * the official FAQ (https://docs.meshcore.io/faq/).
	 *
	 * Same interaction model as prmsh.com's RoutingStepper: motion only in
	 * response to the controls, every step's meaning carried by the caption
	 * (announced via aria-live), and the SVG is decorative.
	 */
	type Step = { name: string; body: string };
	type Props = {
		steps: Step[];
		labels: {
			prev: string;
			next: string;
			stepOf: string;
			legendCompanion: string;
			legendRepeater: string;
			legendTx: string;
			legendQuiet: string;
			pathLabel: string;
			noPath: string;
		};
	};

	let { steps, labels }: Props = $props();
	let i = $state(0);
	const total = $derived(steps.length);

	// A ridge with two high repeaters (A1, D2) and one in the valley (7C).
	const N = [
		{ x: 36, y: 108, id: 'A', kind: 'companion' },
		{ x: 128, y: 74, id: '3F', kind: 'repeater' },
		{ x: 236, y: 44, id: 'A1', kind: 'repeater' },
		{ x: 300, y: 102, id: '7C', kind: 'repeater' },
		{ x: 392, y: 52, id: 'D2', kind: 'repeater' },
		{ x: 452, y: 114, id: 'C', kind: 'companion' },
		{ x: 526, y: 100, id: 'B', kind: 'companion' },
	] as const;
	const terrain =
		'M0 128 C40 124 90 100 128 90 C170 80 200 58 236 58 C268 58 280 116 300 116 C320 116 360 64 392 64 C424 64 440 120 480 120 C510 120 540 116 560 118 L560 160 L0 160 Z';

	/** Every pair of nodes within radio reach of each other. */
	const reach: [number, number][] = [
		[0, 1],
		[1, 2],
		[1, 3],
		[2, 3],
		[2, 4],
		[3, 4],
		[3, 5],
		[4, 5],
		[4, 6],
	];
	const route: [number, number][] = [
		[0, 1],
		[1, 2],
		[2, 4],
		[4, 6],
	];

	type Frame = {
		tx: number[];
		quiet: number[];
		edges: [number, number][];
		edgeKind: 'flood' | 'route';
		down?: number;
		path: string | null;
		pathBroken?: boolean;
	};
	const pathText = '3F › A1 › D2';
	const frames: Frame[] = [
		{ tx: [0, 1, 2, 3, 4], quiet: [5], edges: reach, edgeKind: 'flood', path: null },
		{ tx: [6], quiet: [], edges: route, edgeKind: 'route', path: pathText },
		{ tx: [0, 1, 2, 4], quiet: [3, 5], edges: route, edgeKind: 'route', path: pathText },
		{
			tx: [0, 1, 3, 4],
			quiet: [5],
			edges: [
				[0, 1],
				[1, 3],
				[3, 4],
				[4, 6],
			],
			edgeKind: 'flood',
			down: 2,
			path: pathText,
			pathBroken: true,
		},
	];
	const f = $derived(frames[Math.min(i, frames.length - 1)]);
	const stepLabel = $derived(
		labels.stepOf.replace('{n}', String(i + 1)).replace('{total}', String(total)),
	);
</script>

<div class="stepper">
	<ol class="stepper__steps">
		{#each steps as s, n (n)}
			<li>
				<button
					type="button"
					class="stepper__step"
					aria-current={n === i ? 'step' : undefined}
					onclick={() => (i = n)}
				>
					<span class="mono" aria-hidden="true">{String(n + 1).padStart(2, '0')}</span>
					{s.name}
				</button>
			</li>
		{/each}
	</ol>

	<div class="stage">
		<svg viewBox="0 0 560 160" aria-hidden="true" focusable="false">
			<path d={terrain} class="terrain" />
			{#each reach as [a, b] (`${a}-${b}`)}
				<line x1={N[a].x} y1={N[a].y} x2={N[b].x} y2={N[b].y} class="reach" />
			{/each}
			{#each f.edges as [a, b] (`${i}-${a}-${b}`)}
				<line x1={N[a].x} y1={N[a].y} x2={N[b].x} y2={N[b].y} class="edge edge--{f.edgeKind}" />
			{/each}
			{#each N as node, n (n)}
				{@const isTx = f.tx.includes(n)}
				<g
					class="node node--{node.kind}"
					class:is-tx={isTx}
					class:is-quiet={f.quiet.includes(n)}
					class:is-down={f.down === n}
				>
					{#if isTx}
						<circle cx={node.x} cy={node.y} r="19" class="halo" />
					{/if}
					{#if node.kind === 'repeater'}
						<rect x={node.x - 9} y={node.y - 9} width="18" height="18" class="shape" />
					{:else}
						<circle cx={node.x} cy={node.y} r="8" class="shape" />
					{/if}
					{#if f.down === n}
						<path d={`M${node.x - 6} ${node.y - 6}l12 12m0-12-12 12`} class="cross" />
					{/if}
					<text x={node.x} y={node.y - 18} text-anchor="middle">{node.id}</text>
				</g>
			{/each}
		</svg>
	</div>

	<div class="stepper__readout" aria-live="polite">
		<p class="visually-hidden">{stepLabel}</p>
		<p class="stepper__name">{steps[i].name}</p>
		<p class="stepper__body">{steps[i].body}</p>
		<p class="stepper__path mono">
			<span>{labels.pathLabel}:</span>
			{#if f.path}
				<span class="path" class:is-broken={f.pathBroken}>A › {f.path} › B</span>
			{:else}
				<span class="path path--none">{labels.noPath}</span>
			{/if}
		</p>
	</div>

	<div class="stepper__controls">
		<p class="stepper__count mono" aria-hidden="true">{stepLabel}</p>
		<div class="stepper__buttons">
			<button
				type="button"
				class="btn btn--secondary"
				onclick={() => (i = Math.max(0, i - 1))}
				aria-disabled={i === 0}
			>
				{labels.prev}
			</button>
			<button
				type="button"
				class="btn btn--primary"
				onclick={() => (i = Math.min(total - 1, i + 1))}
				aria-disabled={i === total - 1}
			>
				{labels.next}
			</button>
		</div>
	</div>

	<ul class="legend mono">
		<li><span class="key key--companion" aria-hidden="true"></span>{labels.legendCompanion}</li>
		<li><span class="key key--repeater" aria-hidden="true"></span>{labels.legendRepeater}</li>
		<li><span class="key key--tx" aria-hidden="true"></span>{labels.legendTx}</li>
		<li><span class="key key--quiet" aria-hidden="true"></span>{labels.legendQuiet}</li>
	</ul>
</div>

<style>
	.stepper {
		display: grid;
		gap: var(--s-4);
	}

	.stepper__steps {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--s-2);
	}

	@media (min-width: 40rem) {
		.stepper__steps {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.stepper__step {
		display: flex;
		align-items: baseline;
		gap: var(--s-2);
		width: 100%;
		min-height: 44px;
		padding: var(--s-2) var(--s-3);
		border: 1px solid var(--c-border-strong);
		border-radius: var(--r-control);
		background: transparent;
		color: var(--c-text-2);
		font: 500 var(--t-sm) / 1.25 var(--f-body);
		text-align: left;
		cursor: pointer;
		transition:
			border-color 160ms var(--ease-out),
			color 160ms var(--ease-out),
			background-color 160ms var(--ease-out);
	}

	.stepper__step:hover {
		color: var(--c-text);
		border-color: var(--c-text-2);
	}

	.stepper__step[aria-current='step'] {
		color: var(--c-text);
		border-color: var(--c-accent-2);
		background: rgb(101 200 176 / 0.08);
	}

	.stepper__step .mono {
		color: var(--c-accent-2);
	}

	.stage {
		border: 1px solid var(--c-border);
		border-radius: var(--r-card);
		background: var(--c-bg);
		padding: var(--s-3) var(--s-2) 0;
	}

	svg {
		width: 100%;
		height: auto;
		overflow: visible;
	}

	/* The diagram scales down to about half size on phones; keep node ids readable. */
	@media (max-width: 40rem) {
		svg text {
			font-size: 19px;
		}
	}

	.terrain {
		fill: var(--c-surface-2);
	}

	.reach {
		stroke: var(--c-border-strong);
		stroke-width: 1;
		stroke-dasharray: 3 5;
	}

	.edge {
		stroke-width: 2.5;
		stroke-linecap: round;
	}

	.edge--flood {
		stroke: var(--c-accent-2);
	}

	.edge--route {
		stroke: var(--c-accent);
		stroke-width: 3;
	}

	.shape {
		fill: var(--c-bg);
		stroke: var(--c-accent-2);
		stroke-width: 2.5;
		transition:
			fill 200ms var(--ease-out),
			stroke 200ms var(--ease-out),
			opacity 200ms var(--ease-out);
	}

	.halo {
		fill: rgb(183 243 107 / 0.14);
		stroke: var(--c-accent);
		stroke-width: 1.5;
	}

	.is-tx .shape {
		fill: var(--c-accent);
		stroke: var(--c-accent);
	}

	.is-quiet .shape {
		stroke-dasharray: 3 3;
	}

	.is-down .shape {
		stroke: var(--c-text-2);
		opacity: 0.5;
	}

	.cross {
		stroke: var(--c-text);
		stroke-width: 2;
		stroke-linecap: round;
	}

	text {
		font-family: var(--f-mono);
		font-size: 12px;
		fill: var(--c-text-2);
	}

	.is-tx text {
		fill: var(--c-text);
	}

	.stepper__readout {
		display: grid;
		gap: var(--s-2);
		min-height: 9rem;
	}

	.stepper__name {
		font-family: var(--f-display);
		font-size: var(--t-lg);
		font-weight: 650;
	}

	.stepper__body {
		color: var(--c-text-2);
		max-width: 60ch;
	}

	.stepper__path {
		display: flex;
		flex-wrap: wrap;
		gap: var(--s-2);
		color: var(--c-text-2);
	}

	.path {
		color: var(--c-accent);
	}

	.path--none {
		color: var(--c-text-2);
	}

	.path.is-broken {
		color: var(--c-text-2);
		text-decoration: line-through;
	}

	.stepper__controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--s-3) var(--s-5);
	}

	.stepper__count {
		color: var(--c-text-2);
	}

	.stepper__buttons {
		display: flex;
		flex-wrap: wrap;
		gap: var(--s-2);
	}

	.stepper__buttons .btn {
		min-height: 44px;
		padding: 0.5rem 1rem;
		font-size: var(--t-sm);
		cursor: pointer;
	}

	.stepper__buttons .btn[aria-disabled='true'] {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: var(--s-2) var(--s-5);
		color: var(--c-text-2);
	}

	.legend li {
		display: inline-flex;
		align-items: center;
		gap: var(--s-2);
	}

	.key {
		display: inline-block;
		flex: none;
		width: 11px;
		height: 11px;
		border: 2px solid var(--c-accent-2);
	}

	.key--companion {
		border-radius: 50%;
	}

	.key--tx {
		border-radius: 50%;
		border-color: var(--c-accent);
		background: var(--c-accent);
	}

	.key--quiet {
		border-radius: 50%;
		border-style: dashed;
	}
</style>
