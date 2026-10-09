declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Eventos personalizados do GA4. Não reenviar aqui page_view, scroll ou
// click: a medição otimizada do GA4 já coleta esses automaticamente.
export function trackEvent(name: string, params?: Record<string, unknown>) {
  window.gtag?.("event", name, params);
}

// Um evento por spa (ex.: clique_whatsapp_copacabana), para virar
// conversão separada no Google Ads.
export function whatsappEventFor(slug: string) {
  return `clique_whatsapp_${slug}`;
}
