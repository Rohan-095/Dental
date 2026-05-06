import { WHATSAPP_RAW } from '@/data/clinic'

export const buildWA = (msg: string) =>
  `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(msg)}`

export const formatPhone = (raw: string) =>
  raw.replace(/(\+1)(\d{3})(\d{3})(\d{4})/, '($2) $3-$4')

export const cn = (...classes: (string | undefined | false | null)[]) =>
  classes.filter(Boolean).join(' ')
