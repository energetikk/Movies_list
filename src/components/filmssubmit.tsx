// import React, { useState, useEffect } from 'react';
// import { searchFilms } from 'путь_к_вашему_экшену';

// // Компонент, который будет отображать найденные фильмы
// const FilmsComponent = () => {
//   const [films, setFilms] = useState([]);

//   useEffect(() => {
//     // Функция для поиска фильмов
//     const fetchFilms = async () => {
//       try {
//         const formData = new FormData();
//         formData.append('searchQuery', 'ваш_поисковый_запрос');

//         // Вызов функции searchFilms и ожидание результата
//         const foundFilms = await searchFilms(formData);

//         // Обновление состояния с найденными фильмами
//         setFilms(foundFilms);
//       } catch (error) {
//         console.error('Ошибка при поиске фильмов:', error);
//       }
//     };

//     // Вызов функции для получения найденных фильмов
//     fetchFilms();
//   }, []); // Пустой массив зависимостей для вызова useEffect только один раз при загрузке компонента

//   return (
//     <div>
//       <h2>Найденные фильмы:</h2>
//       <ul>
//         {films.map((film) => (
//           <li key={film.id}>
//             <p>Название: {film.title}</p>
//             <p>Дата создания: {film.createdAt}</p>
//             {/* Другие свойства фильма */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FilmsComponent;