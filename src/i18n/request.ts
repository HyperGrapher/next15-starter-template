import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  const lang =
    (await cookies()).get("preferred-lang")?.value ??
    (await headers()).get("Accept-Language")?.slice(0, 2) ??
    "en";

  const locale = lang === "tr" ? "tr" : "en";

  return {
    locale,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
