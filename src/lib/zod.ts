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

    duration: z.string().min(1, {
        message: "Укажите длительность фильма в минутах",
    }),
})
