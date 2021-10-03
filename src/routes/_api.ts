import type { Request } from '@sveltejs/kit';
const base = 'http://localhost:3211/api';

export async function api(request: Request, resource: string, data?: {}) {

	const res = await fetch(`${base}/${resource}`, {
		method: request.method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify({...data, })
	});

	return {
		status: res.status,
		body: await res.json()
	};
}
