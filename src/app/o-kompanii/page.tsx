import Link from 'next/link';

import { Container } from '@/components/layout/Container';

export const metadata = { title: 'О компании | Company Site MVP' };

export default function AboutPage(): JSX.Element {
  return (
    <Container className="space-y-8 py-10">
      <section>
        <h1 className="text-2xl font-semibold">О компании</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Мы поставляем промышленную продукцию для производственных предприятий, интеграторов и подрядчиков.
          Работаем с типовыми позициями и нестандартными запросами, где важно соблюсти технические параметры и сроки.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Чем занимаемся</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Подбираем материалы и комплектующие под требования проекта, формируем спецификации и сопровождаем поставку.
          Помогаем оптимизировать закупку за счёт альтернатив и единого канала коммуникации по заказу.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Почему мы</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Даем понятные сроки, фиксируем условия в коммерческом предложении и остаёмся на связи до закрытия заявки.
          Команда консультирует по применению продукции, чтобы снизить риски ошибок при выборе.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Реквизиты</h2>
        <p className="mt-3 text-slate-600">ООО «Пример Индастри» · ИНН 0000000000 · КПП 000000000 · ОГРН 0000000000000</p>
        <p className="mt-2 text-slate-600">р/с 00000000000000000000 в АО «Банк Пример» · БИК 000000000 · к/с 00000000000000000000</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Обсудить задачу</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Расскажите, какую продукцию нужно подобрать, и мы предложим рабочие варианты с ориентиром по срокам и бюджету.
        </p>
        <Link href="/konsultaciya" className="mt-4 inline-block rounded bg-brand px-4 py-2 text-white">
          Получить консультацию
        </Link>
      </section>
    </Container>
  );
}
