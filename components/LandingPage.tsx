
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, Mail, Phone, Instagram } from 'lucide-react';

const nav = [
  { label: 'Início', href: '#inicio' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
];

const beneficios = [
  { title: 'Entrega Profissional', desc: 'Layout moderno, responsivo e pensado para converter.' },
  { title: 'Velocidade e SEO', desc: 'Carregamento rápido e estrutura amigável a buscadores.' },
  { title: 'Foco em Conversão', desc: 'CTA destacado, prova social e seções estratégicas.' },
];

const depoimentos = [
  { nome: 'Cliente A', cargo: 'Empreendedora', texto: 'A landing elevou nossas conversões em poucas semanas. O visual e a narrativa ficaram impecáveis.' },
  { nome: 'Cliente B', cargo: 'Diretor de Operações', texto: 'Processo simples, rápido e com resultado acima do esperado. Recomendo!' },
];

const faqs = [
  { q: 'Em quanto tempo a página fica pronta?', a: 'Após receber o modelo e os conteúdos, a primeira versão sai rapidamente. Ajustes finos são feitos em ciclos curtos.' },
  { q: 'Vocês também hospedam a página?', a: 'Posso te orientar a publicar no seu domínio (Vercel/Netlify/Cloudflare Pages).' },
  { q: 'Posso integrar com WhatsApp/Meta Ads/Pixel?', a: 'Sim. Configuro botões diretos, eventos básicos e pixels ao publicar.' },
];

export default function LandingPage() {
  const [sending, setSending] = useState(false);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      alert('Mensagem enviada! Em produção eu conecto com seu e-mail/CRM.');
      setSending(false);
    }, 900);
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#inicio" className="font-semibold tracking-tight text-white/90 hover:text-white">SuaMarca</a>
          <nav className="hidden md:flex gap-6 text-sm text-white/70">
            {nav.map((n) => (<a key={n.href} href={n.href} className="hover:text-white transition-colors">{n.label}</a>))}
          </nav>
          <a href="#contato" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-white text-slate-900 hover:opacity-90">
            Fale com a gente <ArrowRight size={16} />
          </a>
        </div>
      </header>

      <section id="inicio" className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 bg-fuchsia-600 opacity-30 blur-[110px] rounded-full"/>
        <div className="absolute -bottom-24 -right-24 h-80 w-80 bg-indigo-600 opacity-30 blur-[110px] rounded-full"/>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 items-center gap-10">
          <motion.div initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
            <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 mb-4">
              <Star size={14} className="opacity-80"/> Novo template pronto para converter
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1]">
              Uma landing page <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400">bonita e vendedora</span>
            </h1>
            <p className="mt-4 text-white/80 md:text-lg max-w-xl">
              Design limpo, performance alta e copy pensada para transformar visitas em contatos e vendas. Envie seu modelo e eu deixo tudo com a sua cara.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#contato" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 font-medium">Quero minha página <ArrowRight size={18}/></a>
              <a href="#beneficios" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/10 font-medium">Ver benefícios</a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-1"><CheckCircle2 size={16}/> 100% Responsiva</div>
              <div className="flex items-center gap-1"><CheckCircle2 size={16}/> Pronta para Ads</div>
              <div className="flex items-center gap-1"><CheckCircle2 size={16}/> SEO Básico</div>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.6, delay:0.1}} className="relative">
            <div className="aspect-video rounded-2xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden">
              <div className="h-full w-full grid place-items-center"><div className="text-center">
                <p className="text-white/80">Coloque aqui um mockup do seu produto/serviço</p>
                <p className="text-xs text-white/50">(ou me envie o modelo que eu substituo)</p>
              </div></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="beneficios" className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-2xl md:text-4xl font-semibold">Por que esta página funciona</h2>
        <p className="text-white/75 mt-2 max-w-2xl">Estrutura pensada em boas práticas de UX, persuasão e carregamento rápido.</p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {beneficios.map((b) => (<div key={b.title} className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <div className="h-10 w-10 rounded-full bg-white/10 grid place-items-center mb-4"><CheckCircle2 size={20}/></div>
            <h3 className="text-lg font-medium">{b.title}</h3>
            <p className="text-white/70 mt-1">{b.desc}</p>
          </div>))}
        </div>
      </section>

      <section id="depoimentos" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between">
          <div><h2 className="text-2xl md:text-4xl font-semibold">Prova social</h2>
            <p className="text-white/75 mt-2">Depoimentos reais para reforçar credibilidade.</p></div>
          <div className="hidden md:block text-white/60 text-sm">5.0 <Star className="inline" size={16}/> média</div>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {depoimentos.map((d, i) => (<div key={i} className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <p className="text-white/85">“{d.texto}”</p>
            <div className="mt-4 text-sm text-white/70">{d.nome} · {d.cargo}</div>
          </div>))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/20 to-fuchsia-600/20 p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-semibold">Pronta para converter desde o dia 1</h3>
          <p className="text-white/80 mt-2 max-w-2xl">CTA destacado, estrutura enxuta e argumento convincente. Integrável com WhatsApp, e-mail e pixels de anúncio.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="#contato" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 font-medium">Solicitar proposta <ArrowRight size={18}/></a>
            <a href="#faq" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/10 font-medium">Dúvidas frequentes</a>
          </div>
        </div>
      </section>

      <section id="faq" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-4xl font-semibold">Perguntas frequentes</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {faqs.map((f, i) => (<details key={i} className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <summary className="cursor-pointer text-lg font-medium">{f.q}</summary>
            <p className="text-white/75 mt-2">{f.a}</p>
          </details>))}
        </div>
      </section>

      <section id="contato" className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div><h2 className="text-2xl md:text-4xl font-semibold">Vamos conversar?</h2>
            <p className="text-white/75 mt-2 max-w-xl">Preencha o formulário ou chame no WhatsApp. Posso clonar seu modelo (Figma, site, PDF) e publicar com domínio próprio.</p>
            <div className="mt-6 space-y-2 text-white/80">
              <a href="mailto:contato@suaempresa.com" className="flex items-center gap-2 hover:underline"><Mail size={18}/> contato@suaempresa.com</a>
              <a href="https://wa.me/5500000000000" className="flex items-center gap-2 hover:underline"><Phone size={18}/> (00) 00000-0000</a>
              <a href="https://instagram.com/suaempresa" className="flex items-center gap-2 hover:underline"><Instagram size={18}/> @suaempresa</a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <div className="grid gap-4">
              <div><label className="text-sm text-white/80">Nome</label>
                <input required className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none" placeholder="Seu nome" /></div>
              <div><label className="text-sm text-white/80">E-mail</label>
                <input type="email" required className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none" placeholder="voce@email.com" /></div>
              <div><label className="text-sm text-white/80">Mensagem</label>
                <textarea required rows={4} className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none" placeholder="Fale um pouco sobre seu projeto"/></div>
              <button disabled={sending} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 font-medium disabled:opacity-60">{sending ? 'Enviando...' : 'Enviar mensagem'}</button>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/60 text-sm">
          <p>© {new Date().getFullYear()} SuaMarca. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#inicio" className="hover:text-white">Início</a>
            <a href="#beneficios" className="hover:text-white">Benefícios</a>
            <a href="#depoimentos" className="hover:text-white">Depoimentos</a>
            <a href="#contato" className="hover:text-white">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
