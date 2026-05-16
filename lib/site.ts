export const site = {
  name: "Жуйкан",
  legalName: "Многопрофильный медицинский центр «Жуйкан» (RuiKang)",
  city: "Хэйхэ",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://zhuykan-dental.ru",
  phoneDisplay: "+7 (924) 443-58-88",
  phoneRaw: "+79244435888",
  whatsapp: "https://wa.me/79244435888",
  telegram: "https://t.me/off_stomjukan",
  max: "https://max.ru/",
  email: "stom.jukan@yandex.ru",
  address:
    "КНР, провинция Хэйлунцзян, г. Хэйхэ, район Айхуй, ул. Восточно-Центральная, 252-4 (800 м от границы)",
  addressShort: "Китай, Хэйхэ, Айхуй, ул. Восточно-Центральная 252-4",
  hours: "Ежедневно 08:00–22:00 (Дальневосточное время)",
  socials: {
    vk: "https://vk.com/",
    telegram: "https://t.me/off_stomjukan",
    whatsapp: "https://wa.me/79244435888",
    max: "https://max.ru/",
  },
};

export function waLink(message: string) {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
