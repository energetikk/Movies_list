## Приложение "Библиотека фильмов"

Проект представляет собой онлайн-сервис поиска фильмов по БД. 
Есть регистрация, поиск фильмов в БД, добавление фильмов в избранное.
Наличие ролей: Администратор/Пользователь. Администраторы могут добавлять и удалять фильмы из БД.

### Ссылка на приложение: https://basefilm.vercel.app
Представлена бета версия приложения размещенная на бесплатном сервере компании Vercel. База данных так же расположена на сервере компании Vercel.
При регистрации пользователь получает роль "user"
Для доступа к расширенному функционалу приложения воспользуйтесь учетной записью администратора: 
Логин: admin@admin.ru
Пароль: 123321

### Особенности и установка приложения на локальной машине:

<summary>Stack:</summary>

-	Next.JS 14 (App Router)
-	Auth.js v5 + JWT для авторизации
-	Prisma ORM
-	PostgreSQL
-	ShadcnUI
-	Tailwind CSS
- Docker


<details>
  
<summary>Установка и запуск проекта</summary>



* Клонировать репозиторий и перейти в него в командной строке:
```
git clone git@github.com:energetikk/Movies_list.git
```
* Установить зависимости:
```
npm install
```
* Сгенерируйте секретный ключ командой:
```
npx auth secret
```
* В корне проекта создать файл .env и скопировать туда этот текст:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgresdata"
```
* Сгененрируйте уникальный ключ для Auth командой:
```
npx auth secret
```
* Запустить базу данныхх в Docker-контейнере командой:
```
docker-compose up -d --build
```
* Для переноса и формирования таблиц БД запустить последовательно 2 команды:
```
npx prisma generate
```
```
npx prisma db push
```
* Для отображения графического интерфейса БД запустите команду:
```
npx prisma studio
```
Интерфейс БД будет доступен по адресу http://localhost:5555/ в дальнейшем через него можно изменить роль Пользователя на Администратора 
* Запустите проект в режиме разработки командой:
```
npm run dev
```
* Приложение откроется по ссылке:
http://localhost:3000/

* Запуск проекта в режиме продакшн командой:
```
npm run build
```
далее откройте билд проекта командой:
```
npm run start
```

</details>
