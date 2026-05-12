Check-List

| # | Сценарий | Тестовые данные | Ожидаемый результат |

| 1 | PUT: Успешное обновление заказа | ID: 1-10, api_key (16 цифр), Body: данные заказа | 200 |
| 2 | PUT: Обновление без API Key | ID: 1-10, api_key empty | 401 |
| 3 | PUT: Обновление с пустым телом запроса | ID: 1-10, api_key (16 цифр), Body: empty | 404 |

| 4 | DELETE: Успешное удаление заказа | ID: 1-10, api_key (16 цифр) | 204 |
| 5 | DELETE: Удаление без API Key | ID: 1-10, api_key: empty | 401 |

| 6 | GET: Получение API ключа (Auth) | username and password | 200 |
| 7 | GET: Авторизация без пароля | только username | 500