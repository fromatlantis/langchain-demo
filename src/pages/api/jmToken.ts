import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const body = await request.json();
        const response = await fetch(`http://ridepassfront-pre.jd.com/gw2/generic/jractime/h5/m/token`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                code: body.code
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
