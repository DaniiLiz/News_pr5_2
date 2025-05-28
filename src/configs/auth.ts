import type { AuthOptions} from "next-auth";
import YandexProvider from 'next-auth/providers/yandex'

export const authConfig: AuthOptions = {
    providers: [
        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID!,
            clientSecret: process.env.YANDEX_SECRET!
        })
    ]
}