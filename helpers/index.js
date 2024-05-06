import { twMerge } from 'tailwind-merge'
import classX from 'clsx'

export const cn = (...args) => twMerge(classX(...args))
