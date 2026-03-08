import Link from 'next/link';

import { Container } from '@/components/layout/Container';

export function Hero(): JSX.Element {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-slate-900 py-14 text-white lg:min-h-[86vh] lg:py-20">
      <div className="absolute inset-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4pvuKS6j7EL-D-JIIR29IRL4A4BYQc-FCxtYC-BDxS2qDzfh9EIDlg5Fv_ZOHXoIJ1VwCrEtvNywL6J9_D4TByG6KZ4TCV73oetEPMIhTNpy-GlhkyQjpUxDyojuZ3f2v3EmCfXEvUJo9IuT84B6-leT8ASjOBVk1MYzbsl326JkAX2rvz_zULlMl9jCOOWSvPvc2TWUZeCtH0OzH0_Qk-9Pdx6D5_3nPwBJTLhOrznWyHtg1BZ-V54FrZSmNLEmWVtcfuejEG5c"
          alt="Высокоточная CNC-обработка"
          className="h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(16,22,34,0.92)_0%,rgba(16,22,34,0.78)_45%,rgba(19,91,236,0.24)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,rgba(56,189,248,0.22),transparent_38%)]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-slate-50/95" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="max-w-3xl space-y-7 rounded-2xl border border-slate-600/50 bg-slate-900/35 p-6 shadow-[0_24px_48px_-34px_rgba(2,6,23,0.98)] backdrop-blur-sm sm:p-8 lg:p-9">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/35 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-sky-100">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
              Next-Gen Tooling Technology
            </span>

            <h1 className="marketing-text text-4xl leading-[1.03] text-white sm:text-5xl lg:text-[3.7rem]">
              Инжиниринг <span className="italic text-sky-300">абсолютной</span> точности
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              Проектируем и поставляем решения для металлообработки, где важны ресурс, повторяемость и стабильность цикла.
              Техническая команда помогает подобрать оптимальную связку инструмента и режимов под реальные условия производства.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/katalog" className="btn-primary">
                Перейти в каталог
              </Link>
              <Link href="/konsultaciya" className="btn-ghost-dark">
                Получить консультацию
              </Link>
            </div>
          </div>

          <div className="hidden space-y-4 lg:block">
            <article className="rounded-2xl border border-slate-500/45 bg-slate-900/40 p-5 shadow-[0_16px_34px_-24px_rgba(2,6,23,1)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/40">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-300">Точность процесса</p>
              <p className="mt-2 text-3xl font-bold text-white">±0.005 мм</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Стабильный результат для серийного и сложного единичного производства.</p>
            </article>

            <article className="group relative overflow-hidden rounded-2xl border border-slate-500/45 bg-slate-900/40 shadow-[0_16px_34px_-24px_rgba(2,6,23,1)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/40">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWu1FtJJMsE8aW_KtPrL-QHxVMp82gorTe4Cwtie2mfi31QfebfvA1vVUod8HK6cv78PXftyynfl4lZ-zVo3sr4fncFUI0s1lBrRPo_xsgL84o0Y3jmUe8dOvBbCgIUURTsusLDcCVMes84tHOrWv7EfCGaDI281nxAVUtzRnGWbZatX_p4aBby9m41qb76GBWq7muzCGQPSi--MEONZ0mUooD-ilKyybFaK3OpO4HCQXlbHOhKQvmbPzXPH0Dskv54wnQKGOhQWo"
                alt="Инженерная система сверления"
                className="h-44 w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-4">
                <p className="text-lg font-semibold text-white">Инженерное сопровождение</p>
                <p className="mt-1 text-sm text-slate-300">Подбор инструмента и стратегии обработки под вашу номенклатуру.</p>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
