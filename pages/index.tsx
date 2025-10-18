import React, { useState, useEffect, useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Star, Phone, Instagram, MessageCircle } from "lucide-react";

// =============================
// Configurações de marca/contato
// =============================
const LOGO_URL = ""; // se vazio, mostra monograma "ME"
const WHATSAPP_NUMBER = "5516992338491"; // DDI+DDD+número
const DISPLAY_PHONE = "(16) 99233-8491";
const WA_MESSAGE = encodeURIComponent("Olá! Quero um orçamento para a festa Mundo Encantado 🎉");
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MESSAGE}`; // href padrão

// =============================
// Navegação & conteúdo
// =============================
const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "/servicos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
] as const;

const beneficios = [
  { title: "Entrega Profissional", desc: "Layout moderno, responsivo e pensado para converter." },
  { title: "Velocidade e SEO", desc: "Carregamento rápido e estrutura amigável a buscadores." },
  { title: "Foco em Conversão", desc: "CTA destacado, prova social e seções estratégicas." },
] as const;

const depoimentos = [
  { nome: "Cliente A", cargo: "Empreendedora", texto: "A landing elevou nossas conversões em poucas semanas. O visual e a narrativa ficaram impecáveis." },
  { nome: "Cliente B", cargo: "Diretor de Operações", texto: "Processo simples, rápido e com resultado acima do esperado. Recomendo!" },
] as const;

const faqs = [
  { q: "Em quanto tempo a página fica pronta?", a: "Após receber o modelo e os conteúdos, a primeira versão sai rapidamente. Ajustes finos são feitos em ciclos curtos." },
  { q: "Vocês também hospedam a página?", a: "Posso te orientar a publicar no seu domínio (Vercel/Netlify/Cloudflare Pages)." },
  { q: "Posso integrar com WhatsApp/Meta Ads/Pixel?", a: "Sim. Configuro botões diretos, eventos básicos e pixels ao publicar." },
] as const;

// =============================
// Tipos auxiliares + Preferências via ENV para Reviews (dinâmicas via API)
// =============================
 type LiveReview = {
  author?: string;
  profilePhotoUrl?: string;
  rating?: number;
  text?: string;
  time?: string;
};
 type LiveReviewsPayload = {
  rating?: number;
  total?: number;
  url?: string;
  reviews: LiveReview[];
};

// Preferências de exibição (podem ser controladas via env no backend)
const REVIEWS_MAX_CLIENT = 5; // Places API retorna no máx. 5
const REVIEWS_MIN_RATING = 4; // espelho do backend

// =============================
// Página Serviços (Preview)
// =============================
function ServicosPage({
  navigate,
  openWhatsApp,
}: {
  navigate?: (to: string) => void;
  openWhatsApp?: (e?: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const servicos = [
    { titulo: "Personagens Vivos", desc: "Princesas, heróis e temas sob medida para encantar a criançada." },
    { titulo: "Recreação Infantil", desc: "Brincadeiras dirigidas, gincanas e atividades por faixa etária." },
    { titulo: "Animação Musical", desc: "Entrada coreografada, interação com fotos e dança." },
    { titulo: "Oficinas Criativas", desc: "Pintura facial, slime, massinhas, desenhos e artes." },
    { titulo: "Cenografia & Extras", desc: "Balões, brindes, pipoca/algodão, bolhas de sabão e mais." },
  ] as const;

  const pacotes = [
    { nome: "Essencial", pontos: ["1h30 de recreação", "1 personagem vivo", "Som ambiente", "Brincadeiras guiadas"], destaque: false },
    { nome: "Premium", pontos: ["2h de recreação", "2 personagens vivos", "Animação musical", "Pintura facial"], destaque: true },
    { nome: "Mega Festa", pontos: ["3h de recreação", "3+ personagens", "Cenografia básica", "Oficina criativa"], destaque: false },
  ] as const;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-4xl md:text-5xl font-semibold">Serviços</h1>
          <p className="text-white/70 mt-2">Escolha os formatos ideais para o seu evento.</p>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate?.("home");
            }}
            className="inline-block mt-4 text-sm text-white/80 underline hover:text-white"
          >
            ← Voltar para o início
          </a>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicos.map((s, i) => (
          <div key={i} className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <h3 className="text-lg font-medium">{s.titulo}</h3>
            <p className="text-white/70 mt-1">{s.desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-violet-400">Pacotes</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {pacotes.map((p, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 border ${p.destaque ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10"}`}
            >
              <h3 className="text-xl font-semibold">{p.nome}</h3>
              <ul className="mt-4 space-y-2 text-white/80">
                {p.pontos.map((pt, k) => (
                  <li key={k} className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5" /> {pt}
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openWhatsApp}
                className="mt-6 z-20 cursor-pointer select-none inline-flex px-4 py-2 rounded-xl bg-green-500 text-white font-medium shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-95"
                aria-label="Solicitar orçamento pelo WhatsApp"
                style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
              >
                <span className="inline-flex items-center gap-2 pointer-events-none">
                  <MessageCircle size={18} className="shrink-0" />
                  <span>Solicitar orçamento</span>
                </span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// =============================
// Página principal (Landing)
// =============================
export default function LandingPage() {
  const [route, setRoute] = useState<"home" | "servicos">("home");
  const [pendingHash, setPendingHash] = useState<string | null>(null);
  const [liveReviews, setLiveReviews] = useState<LiveReviewsPayload | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null); // mantido caso queira ativar player em produção

  useEffect(() => {
    if (route === "home" && pendingHash) {
      const el = document.querySelector(pendingHash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingHash(null);
    }
  }, [route, pendingHash]);

  // Tenta buscar reviews reais via API (quando disponível em produção).
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/reviews", { method: "GET" });
        if (!res.ok) return;
        const data = (await res.json()) as LiveReviewsPayload;
        if (mounted && data?.reviews?.length) setLiveReviews(data);
      } catch (e) {
        // Silencioso no preview. Mantém depoimentos estáticos.
      }
    })();
    return () => { mounted = false; };
  }, []);

  function navigate(to: "home" | "servicos") {
    setRoute(to);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function openWhatsApp(e?: MouseEvent<HTMLAnchorElement>) {
    try {
      // Sempre tratar como gesto do usuário para evitar bloqueio de popup
      e?.preventDefault();

      const ua = navigator.userAgent || "";
      // Detecção mais robusta de mobile
      const isMobile = (navigator as any).userAgentData?.mobile || /Android|iPhone|iPad|iPod|Windows Phone|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);

      (window as any)?.fbq?.("track", "Contact");

      if (isMobile) {
        // 1) Tenta abrir o app nativo
        window.location.href = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${WA_MESSAGE}`;
        // 2) Fallback rápido para Web WhatsApp em nova aba
        setTimeout(() => {
          window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");
        }, 400);
      } else {
        // Desktop: força nova aba
        window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      // Fallback final
      window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");
    }
  }

  function handleNav(href: string, e?: MouseEvent<HTMLAnchorElement>) {
    if (href === "/servicos") {
      e?.preventDefault();
      navigate("servicos");
      return;
    }
    if (href.startsWith("#")) {
      e?.preventDefault();
      if (route === "servicos") {
        setPendingHash(href);
        navigate("home");
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#inicio" onClick={(e) => handleNav("#inicio", e)} className="flex items-center gap-2 group">
            {LOGO_URL ? (
              <img src={LOGO_URL} alt="Logo Mundo Encantado" className="h-8 w-auto object-contain" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-pink-400 to-violet-400 grid place-items-center text-[10px] font-bold">ME</div>
            )}
            <span className="font-semibold tracking-tight text-white/90 group-hover:text-white">Mundo Encantado</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm text-white/70">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => handleNav(n.href, e)}
                className="hover:text-white transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openWhatsApp}
            className="cursor-pointer select-none inline-flex text-sm font-medium px-4 py-2 rounded-xl bg-white text-slate-900 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-95"
            aria-label="Falar com a gente no WhatsApp"
            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
          >
            <span className="inline-flex items-center gap-2 pointer-events-none">
              <span>Fale com a gente</span>
              <ArrowRight size={16} className="shrink-0" />
            </span>
          </a>
        </div>
      </header>

      {/* Router */}
      {route === "home" ? (
        <>
          {/* Hero */}
          <section id="inicio" className="relative overflow-hidden">
            <div className="absolute -top-24 -left-24 h-80 w-80 bg-pink-500 opacity-30 blur-[110px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 h-80 w-80 bg-violet-500 opacity-30 blur-[110px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 items-center gap-10">
              {/* Coluna esquerda: texto */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 mb-4">
                  <Star size={14} className="opacity-80" /> Novo template pronto para converter
                </span>
                <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1]">
                  Uma landing page <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-violet-400">bonita e vendedora</span>
                </h1>
                <p className="mt-4 text-white/80 md:text-lg max-w-xl">
                  Design limpo, performance alta e copy pensada para transformar visitas em contatos e vendas. Envie seu modelo e eu deixo tudo com a sua cara.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                  href="#contato"
                  onClick={(e) => handleNav("#contato", e)}
                  className="cursor-pointer select-none inline-flex px-5 py-3 rounded-xl bg-white text-slate-900 font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-95"
                  aria-label="Ir para contato"
                  style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
                >
                  <span className="inline-flex items-center justify-center gap-2 pointer-events-none">
                    <span>Quero minha página</span>
                    <ArrowRight size={18} className="shrink-0" />
                  </span>
                </a>
                  <a
                    href="/servicos"
                    onClick={(e) => handleNav("/servicos", e)}
                    className="cursor-pointer select-none inline-flex px-5 py-3 rounded-xl bg-white/10 border border-white/10 font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-95"
                    aria-label="Ver serviços"
                    style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
                  >
                    <span className="inline-flex items-center justify-center gap-2 pointer-events-none">
                      <span>Ver serviços</span>
                    </span>
                  </a>
                </div>
                <div className="mt-6 flex items-center gap-4 text-white/60 text-sm">
                  <div className="flex items-center gap-1"><CheckCircle2 size={16} /> 100% Responsiva</div>
                  <div className="flex items-center gap-1"><CheckCircle2 size={16} /> Pronta para Ads</div>
                  <div className="flex items-center gap-1"><CheckCircle2 size={16} /> SEO Básico</div>
                </div>
              </motion.div>

              {/* Coluna direita: instruções do vídeo (9:16) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                <div className="aspect-[9/16] max-w-[360px] md:max-w-[420px] mx-auto rounded-2xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden">
                  <div className="h-full w-full grid place-items-center px-4 text-center">
                    <div>
                      <p className="text-white/85 font-medium">Vídeo do herói (reels 9:16)</p>
                      <p className="text-white/70 text-sm mt-1">
                        Para produção, faça upload de <span className="font-semibold">public/HomemAranha.mp4</span> no seu repositório (GitHub).
                      </p>
                      <p className="text-white/50 text-xs mt-2">
                        Caminho final: <code>/public/HomemAranha.mp4</code>. O código aponta para <code>"/HomemAranha.mp4"</code> em produção.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Benefícios */}
          <section id="beneficios" className="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <h2 className="text-2xl md:text-4xl font-semibold">Por que esta página funciona</h2>
            <p className="text-white/75 mt-2 max-w-2xl">Estrutura pensada em boas práticas de UX, persuasão e carregamento rápido.</p>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {beneficios.map((b) => (
                <div key={b.title} className="rounded-2xl p-6 bg-white/5 border border-white/10">
                  <div className="h-10 w-10 rounded-full bg-white/10 grid place-items-center mb-4"><CheckCircle2 size={20} /></div>
                  <h3 className="text-lg font-medium">{b.title}</h3>
                  <p className="text-white/70 mt-1">{b.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Depoimentos (agora com fallback para Google Reviews ao vivo) */}
          <section id="depoimentos" className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl md:text-4xl font-semibold">Prova social</h2>
                <p className="text-white/75 mt-2">Depoimentos reais para reforçar credibilidade.</p>
              </div>
              {liveReviews?.rating ? (
                <div className="hidden md:flex items-center gap-2 text-white/70 text-sm">
                  <span className="font-medium">{liveReviews.rating.toFixed(1)}</span>
                  <Star size={16} />
                  <span>({liveReviews.total ?? 0})</span>
                </div>
              ) : (
                <div className="hidden md:block text-white/60 text-sm">5.0 <Star className="inline" size={16} /> média</div>
              )}
            </div>

            {/* Se houver reviews em tempo real, mostra; senão, usa o array estático */}
            {liveReviews?.reviews?.length ? (
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                {liveReviews.reviews.slice(0, 5).map((r, i) => (
                  <div key={i} className="rounded-2xl p-6 bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      {r.profilePhotoUrl ? (
                        <img src={r.profilePhotoUrl} alt={r.author || "Autor"} className="h-8 w-8 rounded-full object-cover" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-white/10 grid place-items-center text-xs">★</div>
                      )}
                      <div className="text-sm">
                        <div className="font-medium">{r.author || "Cliente"}</div>
                        <div className="text-white/60">{r.time || "recentemente"}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-pink-200">
                      {Array.from({ length: Math.round(r.rating || 0) }).map((_, k) => (
                        <Star key={k} size={14} />
                      ))}
                    </div>
                    <p className="text-white/85 mt-3">“{r.text}”</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                {depoimentos.map((d, i) => (
                  <div key={i} className="rounded-2xl p-6 bg-white/5 border border-white/10">
                    <p className="text-white/85">“{d.texto}”</p>
                    <div className="mt-4 text-sm text-white/70">{d.nome} · {d.cargo}</div>
                  </div>
                ))}
              </div>
            )}

            {/* rodapé de atribuição exigido pela Google */}
            {liveReviews?.url && (
              <div className="mt-6 text-xs text-white/50">
                Avaliações fornecidas por Google. <a href={liveReviews.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">Ver todas no Google</a>
              </div>
            )}
          </section>

          {/* Seção destaque/Oferta */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-violet-400">Pronta para converter desde o dia 1</h3>
              <p className="text-white/80 mt-2 max-w-2xl">CTA destacado, estrutura enxuta e argumento convincente. Integrável com WhatsApp e pixels de anúncio.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href="#contato" onClick={(e) => handleNav("#contato", e)} className="cursor-pointer select-none inline-flex px-5 py-3 rounded-xl bg-white text-slate-900 font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-95" aria-label="Solicitar proposta" style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}>
                <span className="inline-flex items-center gap-2 pointer-events-none"><span>Solicitar proposta</span> <ArrowRight size={18} className="shrink-0" /></span>
              </a>
                <a href="#faq" onClick={(e) => handleNav("#faq", e)} className="cursor-pointer select-none inline-flex px-5 py-3 rounded-xl bg-white/10 border border-white/10 font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-95" aria-label="Dúvidas frequentes" style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}>
                <span className="inline-flex items-center gap-2 pointer-events-none"><span>Dúvidas frequentes</span></span>
              </a>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-2xl md:text-4xl font-semibold">Perguntas frequentes</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {faqs.map((f, i) => (
                <details key={i} className="rounded-2xl p-6 bg-white/5 border border-white/10">
                  <summary className="cursor-pointer text-lg font-medium">{f.q}</summary>
                  <p className="text-white/75 mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Contato */}
          <section id="contato" className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-semibold">Vamos conversar?</h2>
                <p className="text-white/75 mt-2 max-w-xl">Fale pelo WhatsApp, ligue ou mande DM. Publicamos no seu domínio.</p>
                <div className="mt-6 space-y-2 text.white/80">
                  <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-2 hover:underline"><Phone size={18} /> {DISPLAY_PHONE}</a>
                  <a href="https://instagram.com/mundoencantadorp" className="flex items-center gap-2 hover:underline"><Instagram size={18} /> @mundoencantadorp</a>
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold">Chame no WhatsApp</h3>
                <p className="text-white/70 mt-1">Resposta mais rápida e prática.</p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openWhatsApp}
                  className="mt-4 z-20 cursor-pointer select-none inline-flex px-5 py-3 rounded-xl bg-green-500 text-white font-medium shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-95"
                  aria-label="Falar no WhatsApp agora"
                  style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
                >
                  <span className="inline-flex items-center gap-2 pointer-events-none">
                    <MessageCircle size={18} className="shrink-0" />
                    <span>Falar no WhatsApp agora</span>
                  </span>
                </a>
                <div className="mt-4 grid sm:grid-cols-2 gap-2">
                  <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="z-20 cursor-pointer select-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 active:scale-95"
                  aria-label="Ligar agora"
                  style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
                >
                  <span className="inline-flex items-center gap-2 pointer-events-none">
                    <Phone size={16} className="shrink-0" />
                    <span>Ligar agora</span>
                  </span>
                </a>
                  <a
                  href="https://instagram.com/mundoencantadorp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="z-20 cursor-pointer select-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg.white/10 border border.white/10 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 active:scale-95"
                  aria-label="Mandar DM no Instagram"
                  style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
                >
                  <span className="inline-flex items-center gap-2 pointer-events-none">
                    <Instagram size={16} className="shrink-0" />
                    <span>Mandar DM</span>
                  </span>
                </a>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <ServicosPage navigate={navigate} openWhatsApp={openWhatsApp} />
      )}

      {/* Rodapé */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Mundo Encantado. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#inicio" onClick={(e) => handleNav("#inicio", e)} className="hover:text-white">Início</a>
            <a href="/servicos" onClick={(e) => handleNav("/servicos", e)} className="hover:text-white">Serviços</a>
            <a href="#depoimentos" onClick={(e) => handleNav("#depoimentos", e)} className="hover:text-white">Depoimentos</a>
            <a href="#contato" onClick={(e) => handleNav("#contato", e)} className="hover:text-white">Contato</a>
          </div>
        </div>
      </footer>

      {/* Botão flutuante WhatsApp */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={openWhatsApp}
        className="fixed bottom-6 right-6 z-50 cursor-pointer select-none px-4 py-3 rounded-full bg-green-500 text-white font-medium shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-95"
        aria-label="Abrir conversa no WhatsApp"
        style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
      >
        <span className="inline-flex items-center gap-2 pointer-events-none">
          <MessageCircle size={18} className="shrink-0" />
          <span>WhatsApp</span>
        </span>
      </a>
    </div>
  );
}

/* ==========================
   TEST CASES (manuais)
   ==========================
1) Renderiza sem erro de sintaxe.
2) Navegação para Serviços (topo, herói e rodapé) muda a rota no preview; voltar via links da navbar/rodapé rola suavemente até a âncora.
3) CTAs de WhatsApp (topo/contato/pacotes) abrem app no celular e Web no desktop; evento fbq('Contact') se disponível. O botão "Fale com a gente" do topo usa `preventDefault()+window.open` e tem área inteira clicável.
4) Botão flutuante do WhatsApp: área inteira clicável; foco visível; active:scale-95.
5) Links secundários: tel:+55… e Instagram.
6) Responsividade: layout em 1 coluna no mobile; CTAs acessíveis.
7) Acessibilidade visual: contraste alto nos CTAs verdes.
8) Serviços: cards renderizam; pacotes listam bullets e CTA por card.
9) Nenhum <motion.div> fica sem fechamento; JSX corretamente aninhado.
10) Sem erro de "Adjacent JSX elements" – cada retorno JSX possui um wrapper (fragmento ou elemento pai).
11) CTAs de WhatsApp usam `preventDefault()` + `window.open(...,'_blank')` para garantir que sempre abra nova aba no desktop; no mobile, tenta `whatsapp://` e faz fallback rápido para Web WhatsApp.
12) Todos os botões estilizados (Hero, Oferta, Contato, Pacotes) têm área inteira clicável; conteúdo interno usa `pointer-events-none`. "Ligar agora" aciona discador do celular em qualquer ponto do retângulo; "Mandar DM" abre o Instagram em nova aba.
13) **Novo**: Se `/api/reviews` existir e retornar dados, a seção Depoimentos exibe avaliações reais com atribuição "Google" e link "Ver todas no Google" (até 5 reviews por limitação da Places API); caso contrário, mantém os depoimentos estáticos sem quebrar o layout.
*/
