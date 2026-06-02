-- FlashMeet 2.0 — инициализация схемы базы данных

-- Таблица: users (постоянные профили участников)
CREATE TABLE IF NOT EXISTS users (
    telegram_id      BIGINT PRIMARY KEY,
    name             TEXT,
    gender           TEXT CHECK (gender IN ('мужской', 'женский', 'другой')),
    age              INTEGER CHECK (age >= 18),
    role             TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'organizer')),
    status           TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
    complaints_count INTEGER NOT NULL DEFAULT 0,
    rating_sum       INTEGER NOT NULL DEFAULT 0,
    rating_count     INTEGER NOT NULL DEFAULT 0
);

-- Таблица: impulses (временная лента встреч обычных пользователей)
CREATE TABLE IF NOT EXISTS impulses (
    impulse_id  SERIAL PRIMARY KEY,
    creator_id  BIGINT NOT NULL REFERENCES users(telegram_id),
    tag         TEXT,
    description TEXT CHECK (char_length(description) <= 150),
    selfie_url  TEXT,
    latitude    DOUBLE PRECISION,
    longitude   DOUBLE PRECISION,
    address     TEXT,
    status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed')),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Таблица: slots (коммерческая лента предложений от организаторов)
CREATE TABLE IF NOT EXISTS slots (
    slot_id      SERIAL PRIMARY KEY,
    organizer_id BIGINT NOT NULL REFERENCES users(telegram_id),
    format_type  TEXT NOT NULL CHECK (format_type IN ('заведение', 'событие')),
    title        TEXT,
    description  TEXT,
    contacts     TEXT,
    latitude     DOUBLE PRECISION,
    longitude    DOUBLE PRECISION,
    address      TEXT,
    status       TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'template')),
    created_at   TIMESTAMP NOT NULL DEFAULT NOW()
);
