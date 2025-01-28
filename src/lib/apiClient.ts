type ApiClient = <Data>(
    input: RequestInfo | URL,
    init?: (Omit<RequestInit, "body"> & { body?: object })
  ) => Promise<Data>;
  
  /**
   * Type-safe `fetch` with good defaults
   *
   * @example
   * ```ts
   * const data = await apiClient<string>("/api/ping");
   * console.log(data); // => "pong"
   * ```
   */
  export const apiClient = new Proxy(fetch, {
    async apply(
      target,
      thisArg,
      args: [input: RequestInfo | URL, init?: RequestInit | undefined]
    ) {
      const [url, init] = args;

      let headers = new Headers(init?.headers);

      if (init?.body && !(init?.body instanceof FormData)) {
        headers = new Headers({
          'Content-Type': 'application/json',
          ...init?.headers,
        });
      }

      const nextInit = {
        ...init,
        headers,
        credentials: 'include',
      } satisfies RequestInit;

      if (init?.body && !(init?.body instanceof FormData)) {
        nextInit.body = JSON.stringify(init?.body);
      }

      const response = await target.apply(thisArg, [
        `${getBaseUrl()}${String(url)}`,
        nextInit,
      ]);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const results = await response.json();

      if (!results.ok) {
        throw new Error(results.error);
      }

      return results.data;
    },
  }) as ApiClient;
  
  // taken from https://trpc.io/docs/client/nextjs/setup#4-create-trpc-hooks
  function getBaseUrl() {
    if (typeof window !== "undefined") {
      // browser should use relative path
      return "";
    }
  
    if (process.env.VERCEL_URL) {
      // reference for vercel.com
      return `https://${process.env.VERCEL_URL}`;
    }
  
    if (process.env.RENDER_INTERNAL_HOSTNAME) {
      // reference for render.com
      return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
    }
  
    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
  }