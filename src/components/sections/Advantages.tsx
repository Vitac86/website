import { Container } from '@/components/layout/Container';
import { ConsultationForm } from '@/components/forms/ConsultationForm';

const advantages = [
  {
    icon: '◉',
    title: 'Увеличенный ресурс инструмента',
    description: 'PVD/CVD покрытия повышают термостойкость и продлевают срок службы инструмента до 40%.'
  },
  {
    icon: '◎',
    title: 'Технический консалтинг',
    description: 'Оптимизация циклов обработки и стратегии резания для сложных деталей и материалов.'
  },
  {
    icon: '◈',
    title: 'Логистика без задержек',
    description: 'Отгрузка в день заказа через сеть распределительных центров и предсказуемые сроки поставки.'
  }
];

export function Advantages(): JSX.Element {
  return (
    <section className="section-shell section-transition relative overflow-hidden bg-slate-100/70">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(56,189,248,0.14),transparent_40%),radial-gradient(circle_at_88%_78%,rgba(37,99,235,0.08),transparent_44%)]" />
      <Container>
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_1.02fr] lg:items-start lg:gap-12">
          <div className="space-y-8 pt-1">
            <div>
              <span className="section-kicker border-sky-300/40 bg-sky-200/30 text-sky-900">Операционное совершенство</span>
              <h2 className="section-title mt-4 text-slate-900">Преимущества Precision Cut</h2>
              <p className="mt-4 max-w-xl text-slate-600 sm:text-lg sm:leading-8">
                Сервис ориентирован на производственный результат: ресурс инструмента, стабильность обработки и предсказуемость поставок.
              </p>
            </div>

            <div className="space-y-6">
              {advantages.map((item) => (
                <article
                  key={item.title}
                  className="group flex gap-4 rounded-2xl border border-slate-200/85 bg-white/95 p-5 shadow-[0_16px_30px_-24px_rgba(15,36,57,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_20px_36px_-24px_rgba(15,36,57,0.82)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-lg font-bold text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-slate-600 sm:text-[1.02rem] sm:leading-7">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="relative rounded-[1.35rem] border border-slate-700/80 bg-[linear-gradient(145deg,rgba(15,23,42,0.95),rgba(30,41,59,0.9))] p-6 shadow-[0_26px_48px_-32px_rgba(2,6,23,1)] sm:p-8">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-sky-400/20 blur-3xl" />
            <h3 className="mb-2 text-2xl font-bold text-white">Техническая консультация</h3>
            <p className="mb-6 text-sm leading-6 text-slate-300 sm:text-base">
              Заполните форму, чтобы получить рекомендации по инструменту, режимам обработки и экономике цикла.
            </p>
            <ConsultationForm theme="dark" />
          </div>
        </div>
      </Container>
    </section>
  );
}
