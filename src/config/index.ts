export const OPENAI_API_KEY =
    // @ts-ignore
    typeof Deno !== 'undefined'
        ? // @ts-ignore
          Deno?.env.get('OPENAI_API_KEY')
        : import.meta.env.OPENAI_API_KEY ?? '';
export const BASE_URL =
    // @ts-ignore
    typeof Deno !== 'undefined'
        ? // @ts-ignore
          Deno?.env.get('BASE_URL')
        : import.meta.env.BASE_URL ?? '';
