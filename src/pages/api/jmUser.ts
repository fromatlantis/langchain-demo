import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const body = await request.json();
        const response = await fetch(`https://msinner.jr.jd.com/gw2/generic/jractime/h5/m/userInfo`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                token: body.token
            }),
        });
        const res = await response.json()
        console.log(res);
        return new Response(JSON.stringify(res));
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: {
                    message: error.message,
                },
            }),
            { status: 400 },
        );
    }
};
