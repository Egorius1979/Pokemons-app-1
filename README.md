# KODE-task-2 (Pokemons-app)

## Декомпозиция

1. Бегло прочитал документацию **_API покемонов_** Определился с общим количеством компонентов приложения, установил **Create React App**, создал заглушки (пару-тройку часов).
2. Определился со стейтами у компонентов и с их пробросом пропсами, сделал коллбэк в родительском помпоненте main-page для установки и обновления стейтов из дочернего компонента выбора селектов sidebar для дальнейшего проброса пропсов дочернему компоненту cards и для хранения состояния стейтов селектов (фильтров) при размонтировании дочерних комопонентов, когда осуществляется переход на страницу с детальной инфой по покемону (часа два-три часов, пока ещё параллельно почитывал про использование контекста для хранения общего состояния приложения).
3. Начал работать с **_API покемонов_** вплотную, тестировать с помощью _Postman_ различные варианты запросов, дабы точнее определиться с общей логикой приложения и с построением роутов (часа 3-4, параллельно формируя логику и JSX отдельныx компонентов)
4. Так как был дан карт-бланш на использование доп.библиотек - решил подключить **Redux** (), поскольку он прост и лаконичен в плане работы с общим состоянием приложения, все _API-запросы_ перекочевали туда же (несколько часов на установку **React-Redux-App** и переработку логики при отказе от пропсов)
5. В общем, несколько дней ушло на нормальный вненшний вид приложения. Весь CSS написан лично мной, кроме честно **"украденных"** глянцевых кнопок хэдера и авторизации. При небольшом опыте работы с CSS было потрачено очень много времени именно на внешний вид приложения, явно больше, чем на логику
6. Отказался от хранения стэйтов выбранных type и subtype (typeSelected и subtypeSelected) при разработке пагинации, поскольку использовать useParams показалось проще в том плане, что логика приложения подразумевает переход к первой странице, при каждом перевыборе селектов. Единственный редьюсер оказался крайне худым и уже казалось, что можно было легко обойтись и без редакса.
7. Полностью доделал логику авторизации и редиректа с приватных страниц приложения.

## Сложности

1. Первая и главная сложность - не смог нормально задеплоить приложение на **_GithubPages_**. Есть подозрение, что дело в _Redux_, но точной инфы не нашёл - потрачен день на поиск и решение проблемы с различнейшемы вариантами, найденными на просторах сети, но, увы, прошу простить и понять (и basepath у BrowserRouter прописывал и менял script package.json на "build": "react-scripts build && cp build/index.html build/404.html" и много чего ещё интересного). Максимально что удалось сделать - работающее исключительно при взаимодействиии с интерфейсом приложение, при обновлении, прописывании вручную пути в адресной строке - неизменная ошибка 404, с каким бы бубном и плясками я вокруг не шаманил. Прикрутил server.js и отправил на хероку - всё прекрасно работает. [Деплой приложения здесь](https://pokemons-app-1.herokuapp.com/)
2. Остальные сложности в основном были связаны с нормальным отображением приложения -то есть, с реализацией CSS - ввиду небольшого опыта пришлось много читать и экспериментировать. Детальное отображение свойств на странице просмотра покемона несколько кривовато для различных девайсов. При выборе последней страницы пагинации или при единичном наборе карточек при сочетании селектов высота карточки заполняла всю страницу при дефолтном свойстве align-items (flex), а при установке align-items: baseline bkb flex-start "не очень" отображались заполненные карточками страницы. Сделал динамически меняющиеся классы для этого случая (да и для многих других, чтоже сделал динамиченски меняющиеся классы)
3. Несколько раз опробывалась логика работы с извлечением параметров (useParams) и параллельным их обновлением в сторе редакса - отказался полностью от дублирования в сторе.
4. Не решил вопрос с повторным рендером первой страницы текущего набора селектов, при переходе со страницы отличной от 1 на другой type bkb subtype. Логику явления понимаю - параметр приходит мгновенно и компонент рендерит на основании изменённого параметра текущий набор карточек (пока сервер отдаёт новый JSON-набор) и при получении нового набора рендерит уже его. Просто не успел пофиксить этот момент - как минимум это можно сделать кривыми костылями с задержкой рендера, а как сделать правильно и нормально - это надо чутка покумекать.

## Доп. задачи (\*)

сделано:

- Пагинация карточек в самом простом виде;
- Сохранение сессии авторизованного пользователя после закрытия вкладки браузера;
- Адаптивный дизайн (ну, с натяжечкой, наверное)

Остальное не успел - патался довести до ума общий вид и набор элементов, чем сделать всё но наполовину.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
