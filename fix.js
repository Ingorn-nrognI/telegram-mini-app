const fs = require('fs');
const file = './index.html';
let code = fs.readFileSync(file, 'utf8');

// 1. Заменяем applyAppLanguage("en") на "ru"
code = code.replace('applyAppLanguage("en");', 'applyAppLanguage("ru");');

// 2. Заменяем appSettings language default на "ru"
code = code.replace(
  'language: window._savedAppSettings?.language || "en",',
  'language: window._savedAppSettings?.language || "ru",'
);

// 3. Восстанавливаем APP_TRANSLATIONS.ru
const oldRu = code.slice(code.indexOf('  ru: {'), code.indexOf('  en: {'));
const newRu = `  ru: {
    balance: "Баланс", wallet: "Кошелёк", tabLeaderboard: "Таблица",
    tabGames: "Игры", tabPvp: "PvP", tabSkins: "Скины", tabHistory: "История",
    settingsTitle: "Настройки", connecting: "Подключение...",
    waitingRound: "Ожидание раунда...", players: "Игроки",
    recentRounds: "Последние раунды", scanner: "Сканер",
    bank: "Банк", myChance: "Мои шансы", allIn: "Ва-банк",
    play: "Играть", history: "История", leaderboard: "Таблица лидеров",
    gameHistory: "История игр", modeScanner: "Режим: Сканер",
    won: "Выиграл", lost: "Проиграл", yourColor: "Твой цвет в арене этого раунда",
    playersInRound: "Игроки в раунде", myStake: "Моя ставка",
    totalBank: "Общий банк", myResult: "Мой результат",
    playerProfile: "ПРОФИЛЬ ИГРОКА", deposit: "Пополнить", withdraw: "Вывести",
    totalWins: "ВСЕГО ПОБЕД", settings: "Настройки",
    language: "ЯЗЫК", graphicsQuality: "КАЧЕСТВО ГРАФИКИ",
    vibration: "ВИБРАЦИЯ", low: "Низкое", medium: "Среднее", high: "Высокое",
    on: "Вкл", off: "Выкл", winner: "Победитель",
    dateTime: "Дата и время", playersCount: "Игроков", stake: "Ставка",
    waitingPlayers: "Ожидание игроков...", bestWin: "Лучший выигрыш в раунде",
    joinRound: "Войти в раунд", lobbyFull: "Раунд заполнен", shuffling: "Перемешивание",
    roundActive: "Раунд идёт", roundFinished: "Показ результата", preparing: "Подготовка",
    addStake: "Добавить", joinBeforeStart: "Войти до старта",
    stakeSettings: "Настройка ставок", reset: "Сбросить", save: "Сохранить",
    qualityAuto: "Авто", fpsLabel: "ЧАСТОТА КАДРОВ", fpsAuto: "Авто"
  },
  `;

code = code.replace(oldRu, newRu);
fs.writeFileSync(file, code, 'utf8');
console.log('Done:', code.includes('Баланс'), code.includes('applyAppLanguage("ru")'));