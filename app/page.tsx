import './globals.css'
import LandingPage from '../components/LandingPage'
export default function Page(){return <LandingPage/>}

export default function ServicosPage() {
  const itens = [
    { titulo: "Personagens Vivos", desc: "Princesas, heróis e personagens temáticos para encantar a criançada." },
    { titulo: "Recreação Infantil", desc: "Brincadeiras dirigidas, gincanas e atividades de acordo com a faixa etária." },
    { titulo: "Animação Musical", desc: "Entrada animada, coreografias e interação com os convidados." },
    { titulo: "Oficinas Criativas", desc: "Pintura facial, massinhas, slime, desenh os e artes." },
    { titulo: "Extras", desc: "Balões, brindes, pipoca/algodão doce e muito mais." },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-4xl md:text-5xl font-semibold">Serviços</h1>
          <p className="text-white/70 mt-2">Escolha os pacotes ideais para o seu evento.</p>
          <a href="/" className="inline-block mt-4 text-sm text-white/80 underline hover:text-white">← Voltar para o início</a>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itens.map((s, i) => (
          <div key={i} className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <h3 className="text-lg font-medium">{s.titulo}</h3>
            <p className="text-white/70 mt-1">{s.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
