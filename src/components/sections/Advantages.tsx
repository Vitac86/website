import { Container } from '@/components/layout/Container';

const advantages = [
  {
    title: 'Стабильные поставки под производственный цикл',
    description: 'Формируем поставки по партиям и срокам, чтобы минимизировать простои и дефицит на участке.'
  },
  {
    title: 'Техническая экспертиза по подбору',
    description: 'Помогаем выбрать позиции под условия эксплуатации, требования проекта и планируемый ресурс.'
  },
  {
    title: 'Прозрачные коммерческие условия',
    description: 'Согласовываем спецификацию, стоимость и логистику заранее для предсказуемого бюджета закупки.'
  }
];

export function Advantages(): JSX.Element {
  return (
    <section className="section-shell section-transition">
      <Container>
        <div className="surface-panel-dark relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(56,120,183,0.24),transparent_45%),radial-gradient(circle_at_86%_82%,rgba(30,64,104,0.3),transparent_50%)]" />

          <div className="relative">
            <span className="section-kicker border-slate-500/70 bg-slate-800/55 text-slate-200">Преимущества сотрудничества</span>
            <h2 className="section-title mt-4 text-white">Надёжный поставщик для промышленной закупки</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Работаем как инженерно-коммерческий партнёр: от первичного подбора до согласования поставки и сопровождения в
              процессе эксплуатации.
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {advantages.map((item) => (
                <article key={item.title} className="card-advantage">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
