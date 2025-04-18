import { DM_Mono, Poppins } from 'next/font/google'

export const poppins = Poppins({
    weight: ["300","400","500","600",'700'],
    subsets: ["latin"]
})

export const dm_mono = DM_Mono({
    weight: ["300","400","500"],
    subsets: ["latin"]
})