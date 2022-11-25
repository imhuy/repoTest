export enum ButtonVariants {
    PRIMARY = 'primary',
    OUTLINE = 'outline',
}

export interface IDataDetails {
    Name: string
    Code: string
    ExtendValue?: string | null
}

export interface IData {
    Code: string
    Name: string
    ImageUrl: string
    Symbol: string
    BlockChains: IDataDetails[]
    Genres: IDataDetails[]
    Platforms: IDataDetails[]
    Price: number
}

export enum IPlatform {
    IOS = 'iOS',
    ANDROID = 'Android',
    BROWSER = 'Browser',
    MOBILE = 'Mobile',
    MAC = 'Mac',
    PC = 'PC',
    WINDOW = 'Windows',
}