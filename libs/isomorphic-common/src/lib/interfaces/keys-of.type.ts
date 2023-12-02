export type TKeysOf<TKeySource, TValue> = { [key in keyof TKeySource]: TValue };