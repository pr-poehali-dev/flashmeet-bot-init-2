import { useState } from "react";

type DocKey = "offer" | "privacy" | "b2b" | "contacts";

const docs: Record<DocKey, { title: string; subtitle: string; content: string }> = {
  offer: {
    title: "Публичная оферта",
    subtitle: "18+",
    content: `ПУБЛИЧНАЯ ОФЕРТА
(текст документа будет размещён здесь)

Настоящая публичная оферта регулирует условия использования сервиса FlashMeet лицами, достигшими 18-летнего возраста.

Раздел 1. Общие положения
[Текст раздела будет добавлен]

Раздел 2. Предмет договора
[Текст раздела будет добавлен]

Раздел 3. Права и обязанности сторон
[Текст раздела будет добавлен]

Раздел 4. Ответственность сторон
[Текст раздела будет добавлен]

Раздел 5. Порядок разрешения споров
[Текст раздела будет добавлен]

Раздел 6. Заключительные положения
[Текст раздела будет добавлен]`,
  },
  privacy: {
    title: "Политика конфиденциальности",
    subtitle: "Защита данных",
    content: `ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
(текст документа будет размещён здесь)

Настоящая Политика конфиденциальности описывает порядок обработки персональных данных пользователей сервиса FlashMeet.

Раздел 1. Какие данные мы собираем
[Текст раздела будет добавлен]

Раздел 2. Цели обработки данных
[Текст раздела будет добавлен]

Раздел 3. Хранение данных
[Текст раздела будет добавлен]

Раздел 4. Передача данных третьим лицам
[Текст раздела будет добавлен]

Раздел 5. Права пользователей
[Текст раздела будет добавлен]

Раздел 6. Контакты по вопросам обработки данных
[Текст раздела будет добавлен]`,
  },
  b2b: {
    title: "B2B-оферта",
    subtitle: "Для организаторов",
    content: `B2B-ОФЕРТА ДЛЯ ОРГАНИЗАТОРОВ
(текст документа будет размещён здесь)

Настоящая оферта регулирует условия размещения коммерческих предложений и партнёрства с сервисом FlashMeet для юридических лиц и индивидуальных предпринимателей.

Раздел 1. Статус организатора
[Текст раздела будет добавлен]

Раздел 2. Условия размещения рекламных слотов
[Текст раздела будет добавлен]

Раздел 3. Стоимость и порядок оплаты
[Текст раздела будет добавлен]

Раздел 4. Требования к контенту
[Текст раздела будет добавлен]

Раздел 5. Модерация и блокировка
[Текст раздела будет добавлен]

Раздел 6. Ответственность сторон
[Текст раздела будет добавлен]`,
  },
  contacts: {
    title: "Контакты",
    subtitle: "Связь с нами",
    content: `КОНТАКТНАЯ ИНФОРМАЦИЯ
(реквизиты и контакты будут размещены здесь)

Юридическое лицо:
[Название организации будет добавлено]

ИНН: [будет добавлен]
ОГРН: [будет добавлен]
Юридический адрес: [будет добавлен]

Техническая поддержка:
[Контакт будет добавлен]

По вопросам сотрудничества (B2B):
[Контакт будет добавлен]

По вопросам обработки персональных данных:
[Контакт будет добавлен]`,
  },
};

const navItems: { key: DocKey; label: string; shortLabel: string; badge?: string }[] = [
  { key: "offer", label: "Публичная оферта", shortLabel: "Оферта", badge: "18+" },
  { key: "privacy", label: "Политика конфиденциальности", shortLabel: "Конфид." },
  { key: "b2b", label: "B2B-оферта", shortLabel: "B2B" },
  { key: "contacts", label: "Контакты", shortLabel: "Контакты" },
];

export default function Index() {
  const [active, setActive] = useState<DocKey>("offer");
  const doc = docs[active];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#e8e2d9] flex flex-col" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      {/* Header */}
      <header className="border-b border-[#222] px-6 py-5 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span style={{ fontFamily: "'Cormorant', serif" }} className="text-2xl tracking-widest text-[#c9b97a] uppercase font-light">
            FlashMeet
          </span>
          <span className="text-[10px] text-[#444] tracking-[0.2em] uppercase hidden sm:inline">
            Правовые документы
          </span>
        </div>
        <div className="text-[10px] text-[#333] tracking-widest uppercase">
          Ред. 2025
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar nav */}
        <nav className="md:w-64 lg:w-72 border-b md:border-b-0 md:border-r border-[#1e1e1e] flex flex-col">
          <div className="p-4 md:p-6">
            <p className="text-[10px] text-[#333] tracking-[0.25em] uppercase mb-5 hidden md:block">
              Разделы
            </p>
            <div className="flex md:flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActive(item.key)}
                  className={`
                    relative text-left px-4 py-3 transition-all duration-200
                    text-sm tracking-wide rounded-sm
                    ${
                      active === item.key
                        ? "bg-[#c9b97a]/8 text-[#c9b97a] border border-[#c9b97a]/25"
                        : "text-[#666] border border-transparent hover:text-[#aaa] hover:border-[#222]"
                    }
                  `}
                  style={{ backgroundColor: active === item.key ? "rgba(201,185,122,0.06)" : undefined }}
                >
                  <span className="hidden md:inline">{item.label}</span>
                  <span className="md:hidden text-xs">{item.shortLabel}</span>
                  {item.badge && (
                    <span
                      className={`ml-2 text-[9px] px-1.5 py-0.5 border rounded-sm ${
                        active === item.key ? "border-[#c9b97a]/35 text-[#c9b97a]" : "border-[#333] text-[#444]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {active === item.key && (
                    <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-[#c9b97a] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:block mt-auto p-6 border-t border-[#161616]">
            <p className="text-[10px] text-[#2a2a2a] leading-relaxed">
              Документы размещены в соответствии с требованиями законодательства РФ.
            </p>
          </div>
        </nav>

        {/* Document content */}
        <main className="flex-1 p-6 md:p-10 lg:p-14 overflow-y-auto">
          <div className="max-w-2xl">
            <div className="mb-8 pb-6 border-b border-[#1e1e1e]">
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <h1
                  style={{ fontFamily: "'Cormorant', serif" }}
                  className="text-3xl md:text-4xl lg:text-5xl font-light text-[#e8e2d9] tracking-wide"
                >
                  {doc.title}
                </h1>
                <span className="text-[10px] text-[#c9b97a] tracking-widest uppercase border border-[#c9b97a]/25 px-2 py-0.5 rounded-sm">
                  {doc.subtitle}
                </span>
              </div>
              <p className="text-[10px] text-[#333] tracking-[0.2em] uppercase mt-2">
                FlashMeet 2.0 — действующая редакция
              </p>
            </div>

            <div className="whitespace-pre-line text-sm md:text-[15px] text-[#666] leading-loose font-light tracking-wide">
              {doc.content}
            </div>

            <div className="mt-14 pt-6 border-t border-[#161616] flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c9b97a]/30" />
              </div>
              <span className="text-[10px] text-[#2a2a2a] tracking-widest uppercase">
                FlashMeet · Все права защищены
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
