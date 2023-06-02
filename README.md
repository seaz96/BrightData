# Документация
asp.net rest api 
## Авторизация и аутентификация
### Регистрация
POST-запрос .../Auth/register

Request body:
{
  "login": "string",
  "password": "string",
  "email": "string",
  "passwordConfirm": "string"
}

Response body: 
{
  "login": "string",
  "token": "string"
}

### Авторизация
POST-запрос .../Auth/login

Request body: 
{
  "login": "string",
  "password": "string"
}

Response body: 
{
  "login": "string",
  "token": "string"
}

### Смена пароля
[Authorized] POST-запрос .../Auth/change-password

Request body: 
{
  "login": "string",
  "oldPassword": "string",
  "newPassword": "string",
  "confirmNewPassword": "string"
}

## Действия с пользователями
### Получение пользователя по id
GET-запрос .../User/id/{id}

Response body:
{
  "login": "string",
  "name": "string",
  "vkLink": "string",
  "telegramLink": "string",
  "description": "string",
  "photo": "string",
  "projects": [],
  "id": "0"
}

### Получение информации своего профиля
[Autorized] GET-запрос .../User/{id}

Response body:
{
  "login": "string",
  "name": "string",
  "vkLink": "string",
  "telegramLink": "string",
  "description": "string",
  "photo": "string",
  "id": "0"
}

### Обновление информации профиля
[Authorized] POST-запрос .../User/update

Request body:
{
  "email": "string",
  "name": "string",
  "vkLink": "string",
  "telegramLink": "string",
  "description": "string",
  "photo": "string"
}

## Действия с проектами
### Получение проекта по id
GET-запрос .../Projects/id/{id}

Response body:
{
  "authorID": "0",
  "name": "string",
  "description": "string",
  "technologies": null,
  "githubLink": "string",
  "likes": 0,
  "photo": "string",
  "id": "0"
}

### Создание нового проекта
[Authorized ] POST-запрос .../Projects/add

Request body:
{
  "name": "string",
  "description": "string"
}

### Изменение информации о проекте
[Authorized] POST-запрос .../Projects/update

{
  "name": "string",
  "description": "string",
  "technologies": [
    {
      "id": "string",
      "name": "string"
    }
  ],
  "githubLink": "string",
  "photo": "string"
}

Примечание: при указании технологий можно игнорировать id, в запросе оно его требует, однако этот id сгенерируется на сервере, он не означает id проекта.










