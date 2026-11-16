// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightVersions from 'starlight-versions';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.nookure.com',
	integrations: [
		starlight({
			plugins: [
				starlightVersions({
					current: { label: 'Next' },
					versions: [{ slug: '2.0.0', label: '2.0.0 (Beta)' }],
				}),
			],
			title: 'Nookure Docs',
			components: {
				Head: './src/components/starlight/Head.astro',
				Search: './src/components/starlight/Search.astro',
			},
			logo: {
				light: './src/assets/nookure.svg',
				dark: './src/assets/nookure-white.svg',
				replacesTitle: true,
			},
			customCss: ['./src/styles/custom.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/nookure' },
				{ icon: 'discord', label: 'Discord', href: 'https://discord.nookure.com/' },
			],
			sidebar: [
				{
					label: 'NookureStaff',
					collapsed: false,
					items: [
						{ label: 'Overview', slug: 'nookure-staff' },
						{ label: 'NookureStaff vs NookureStaff+', slug: 'nookure-staff/editions-comparison' },
						{
							label: 'Getting Started',
							items: [
								{ label: 'Installation', slug: 'nookure-staff/getting-started/installation' },
								{ label: 'Database & Cache', slug: 'nookure-staff/getting-started/database-and-cache' },
								{ label: 'Network Synchronization', slug: 'nookure-staff/getting-started/network-sync' },
							],
						},
						{
							label: 'Features & Modules',
							items: [
								{ label: 'Staff Mode', slug: 'nookure-staff/features/staff-mode' },
								{ label: 'Hotbar Items', slug: 'nookure-staff/features/hotbar-items' },
								{ label: 'Vanish & Glow', slug: 'nookure-staff/features/vanish-and-glow' },
								{ label: 'Freeze & Screenshare', slug: 'nookure-staff/features/freeze-and-screenshare' },
								{ label: 'Moderation & Punishments', slug: 'nookure-staff/features/moderation-and-punishments' },
								{ label: 'Warnings & Auto-Escalation', slug: 'nookure-staff/features/warnings-and-evidence' },
								{ label: 'Evidence & S3 Uploads', slug: 'nookure-staff/features/evidence' },
								{ label: 'Inventory & Rollback', slug: 'nookure-staff/features/inventory-and-rollback' },
								{ label: 'Player Inspection & Notes', slug: 'nookure-staff/features/player-inspection-and-notes' },
								{ label: 'Alt Accounts (/dupeip)', slug: 'nookure-staff/features/alt-accounts' },
								{ label: 'Integrations & Auditing', slug: 'nookure-staff/features/integrations' },
								{ label: 'Telemetry & Transparency', slug: 'nookure-staff/features/telemetry-and-transparency' },
							],
						},
						{
							label: 'Configuration',
							items: [
								{ label: 'Overview', slug: 'nookure-staff/configuration/overview' },
								{ label: 'Paper Server Configs', slug: 'nookure-staff/configuration/paper-configs' },
								{ label: 'Punishments Configs', slug: 'nookure-staff/configuration/punishment-configs' },
								{ label: 'Velocity Proxy Configs', slug: 'nookure-staff/configuration/velocity-configs' },
							],
						},
						{
							label: 'Migrations',
							items: [
								{ label: 'Migrating from LiteBans', slug: 'nookure-staff/migrations/litebans' },
							],
						},
						{
							label: 'Reference',
							items: [
								{ label: 'Commands', slug: 'nookure-staff/reference/commands' },
								{ label: 'Permissions', slug: 'nookure-staff/reference/permissions' },
								{ label: 'Placeholders (PAPI)', slug: 'nookure-staff/reference/placeholders' },
							],
						},
						{
							label: 'Developers',
							items: [
								{ label: 'API Overview', slug: 'nookure-staff/developers/api-overview' },
								{ label: 'Events Reference', slug: 'nookure-staff/developers/events' },
							],
						},
					],
				},
			],
		}),
	],
});
