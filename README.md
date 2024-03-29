# Документация
asp.net rest api 
## Авторизация и аутентификация
### Регистрация
POST-запрос .../Auth/register

Request body:
```
{
  "login": "string",
  "password": "string",
  "email": "string",
  "passwordConfirm": "string"
}
```
Response body: 
```
{
  "id": "string",
  "login": "string",
  "token": "string"
}
```
### Авторизация
POST-запрос .../Auth/login

Request body: 
```
{
  "login": "string",
  "password": "string"
}
```
Response body: 
```
{
  "id": "string",
  "login": "string",
  "token": "string"
}
```
### Смена пароля
[Authorized] POST-запрос .../Auth/change-password

Request body: 
```
{
  "login": "string",
  "oldPassword": "string",
  "newPassword": "string",
  "confirmNewPassword": "string"
}
```

### Забыли пароль
POST-запрос .../Auth/recover-password

Request body: 
```
{
  "login": "string",
  "email": "string"
}
```

Если неправильный пароль: status 400, Response body "Wrong email"

## Действия с пользователями
### Получение пользователя по id
GET-запрос .../Users/id/{id}

Response body:
```
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
```
### Получение информации своего профиля
[Autorized] GET-запрос .../Users/{id}

Response body:
```
{
  "login": "string",
  "name": "string",
  "vkLink": "string",
  "telegramLink": "string",
  "description": "string",
  "photo": "string",
  "id": "0"
}
```
### Обновление информации профиля
[Authorized] POST-запрос .../Users/update

Request body:
```
{
  "email": "string",
  "name": "string",
  "vkLink": "string",
  "telegramLink": "string",
  "description": "string",
  "photo": "string"
}
```
## Действия с проектами
### Получение проекта по id
GET-запрос .../Projects/id/{id}

Response body:
```
{
  "authorID": "0",
  "name": "string",
  "description": "string",
  "technologies": [],
  "comments": [],
  "githubLink": null,
  "likes": 0,
  "photo": null,
  "id": "0",
  "isLiked" : false,
  "authorLogin": "login",
  "authorName": "name"
}
```

### Создание нового проекта
[Authorized ] POST-запрос .../Projects/add

Request body:
```
{
  "name": "string",
  "technologies": [
    {
      "id": "string",
      "name": "string"
    }
  ],
  "githubLink": "string",
  "photo": "string"
}
```
### Изменение информации о проекте
[Authorized] POST-запрос .../Projects/update
Request body:
```
{
  "projectId": "string",
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
```
Примечание: при указании технологий можно игнорировать id, в запросе оно его требует, однако этот id сгенерируется на сервере, он не означает id проекта.

### Удаление проекта
[Authorized] POST-запрос .../Projects/delete
Request body:
```
{
    "projectId" : "id"
}
```

### Добавление комментария о проекте
[Authorized] POST-запрос .../Projects/comment
Request body:
```
{
  "text": "string"
}
```

### Получить ленту проектов
[AllowAnonymous] GET-запрос .../Projects/feed
Request body:
```
{
    "count" : 0
}
```

### Лайкнуть проект
[Authorized] POST-запрос .../Projects/like
Request body:
```
{
    "projectId"
}
```
Вводится id проекта

### Убрать лайк
[Authorized] POST-запрос .../Projects/dislike
Request body:
```
{
    "projectId"
}
```
Вводится id проекта









