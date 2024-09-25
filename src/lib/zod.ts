import { z } from 'zod'

export const formSchemaRegister = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),

    email: z.string().min(4, {
        message: "E-mail must be at least 4 characters.",
    }),

    password:
        z.string().min(6, {
            message: "Password must be at least 5 characters.",
        })
            .max(12, {
                message: "Password must be less than 12 characters.",
            })
})

export const formSchemaLogin = z.object({
    email: z.string().min(4, {
        message: "E-mail must be at least 4 characters.",
    }),

    password:
        z.string().min(6, {
            message: "Password must be at least 5 characters.",
        })
            .max(12, {
                message: "Password must be less than 12 characters.",
            })
})

export const formSchemaKeyword = z.object({
    keyword: z.string().min(1, {
        message: "Введите слово для поиска...",
    }),
})

export const formSchemaAddFilm = z.object({
    title: z.string().min(1, {
        message: "Введите название фильма",
    }),

    image: z.string().min(1, {
        message: "Вставьте ссылку на фильм",
    }),

    link: z.string().min(1, {
        message: "Вставьте ссылку на фильм",
    }),
    description: z.string().min(10, {
        message: "Введите описание фильма от 10 до 300 символов",
    }).max(300, {
        message: "Описание не может быть больше 300 знаков",
    }),
    duration: z.string().refine(value => {
        const parsedValue = parseInt(value, 10);
        return !isNaN(parsedValue); // Проверяем, является ли значение числом
    }, {
        message: "Длительность фильма должна быть числом",
    }),
})

export const formAvatar = z.object({
    image: z.string().min(1, {
        message: "Вставьте ссылку на изображение...",
    }),
})
