export const OPENAI_API_KEY =
    // @ts-ignore
    typeof Deno !== 'undefined'
        ? // @ts-ignore
          Deno?.env.get('OPENAI_API_KEY')
        : '';