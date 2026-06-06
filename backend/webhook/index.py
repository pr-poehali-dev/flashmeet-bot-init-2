"""
Webhook-обработчик Telegram-бота FlashMeet (aiogram 3.x).
Принимает обновления от Telegram и обрабатывает хэндлеры через Dispatcher.
"""
import os
import json
import asyncio
import logging
import psycopg2

from aiogram import Bot, Dispatcher
from aiogram.types import Update, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters import Command
from aiogram.types import Message

logging.basicConfig(level=logging.INFO)

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "public")

# URL юридического хаба (страница с документами проекта)
LEGAL_HUB_URL = "https://flashmeet-bot-init-2.poehali.dev"

# ─── Клавиатуры ────────────────────────────────────────────────────────────────

def kb_welcome() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="✨ Заполнить анкету", callback_data="fill_profile")],
        [InlineKeyboardButton(text="📄 Правила (18+)", url=LEGAL_HUB_URL)],
    ])

# ─── DB helpers ────────────────────────────────────────────────────────────────

def get_user(telegram_id: int) -> dict | None:
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    try:
        with conn.cursor() as cur:
            cur.execute(
                f"SELECT telegram_id, status FROM {SCHEMA}.users WHERE telegram_id = %s",
                (telegram_id,)
            )
            row = cur.fetchone()
            if row:
                return {"telegram_id": row[0], "status": row[1]}
            return None
    finally:
        conn.close()

# ─── Handlers ──────────────────────────────────────────────────────────────────

async def cmd_start(message: Message):
    user = get_user(message.from_user.id)

    if user and user["status"] == "active":
        # Пользователь найден и активен — открываем Главное меню (заглушка)
        await message.answer(
            "С возвращением! Открываю главное меню…",
        )
    else:
        # Новый пользователь или не найден
        await message.answer(
            "Привет! Добро пожаловать во FlashMeet.",
            reply_markup=kb_welcome(),
        )

# ─── Bot / Dispatcher setup ────────────────────────────────────────────────────

def build_dp() -> tuple[Bot, Dispatcher]:
    bot = Bot(token=os.environ["TELEGRAM_BOT_TOKEN"])
    dp = Dispatcher()
    dp.message.register(cmd_start, Command("start"))
    return bot, dp

# ─── Cloud Function entry point ────────────────────────────────────────────────

def handler(event: dict, context) -> dict:
    """
    Принимает POST-запрос с телом обновления от Telegram и передаёт его
    в aiogram Dispatcher. Возвращает HTTP 200 в любом случае, чтобы Telegram
    не повторял запрос.
    """
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    try:
        body = event.get("body") or "{}"
        update_data = json.loads(body)

        bot, dp = build_dp()

        update = Update(**update_data)
        asyncio.get_event_loop().run_until_complete(
            dp.feed_update(bot, update)
        )
    except Exception as e:
        logging.error("Webhook error: %s", e)

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        "body": {"ok": True},
    }