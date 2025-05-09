import { Bricolage_Grotesque, DM_Mono, DM_Sans, Inter, Poppins, Rubik } from 'next/font/google'

export const poppins = Poppins({
    weight: ["300","400","500","600",'700','800'],
    subsets: ["latin"]
})

export const inter = Inter({
    weight: ["300","400","500","600",'700'],
    subsets: ["latin"]
})

export const dm_mono = DM_Mono({
    weight: ["300","400","500"],
    subsets: ["latin"]
})

export const dm_sans = DM_Sans({
    weight: ["300","400","500","600","700"],
    subsets: ["latin"]
})

export const rubik = Rubik({
    weight: ["300","400","500","600"],
    subsets: ["latin"]
})

export const bricolage_grotesque = Bricolage_Grotesque({
    weight: ["300","400","500","600"],
    subsets: ["latin"]
})