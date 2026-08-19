import Image from "next/image";

export const serviceItems = [
  {
    label: "Cabelo",
    icon: (
      <Image
        src="/scissors-icon.svg"
        alt="Cabelo"
        width={16}
        height={16}
        aria-hidden
      />
    ),
  },
  {
    label: "Barba",
    icon: (
      <Image
        src="/mustache-icon.svg"
        alt="Barba"
        width={16}
        height={16}
        aria-hidden
      />
    ),
  },
  {
    label: "Acabamento",
    icon: (
      <Image
        src="/razor-icon.svg"
        alt="Acabamento"
        width={16}
        height={16}
        aria-hidden
      />
    ),
  },
  {
    label: "Sobrancelha",
    icon: (
      <Image
        src="/sobrancelha.svg"
        alt="Sobrancelha"
        width={16}
        height={16}
        aria-hidden
      />
    ),
  },
  {
    label: "Massagem",
    icon: (
      <Image
        src="/massagem.svg"
        alt="Massagem"
        width={16}
        height={16}
        aria-hidden
      />
    ),
  },
  {
    label: "Hidratação",
    icon: (
      <Image
        src="/hidratacao.svg"
        alt="Hidratação"
        width={16}
        height={16}
        aria-hidden
      />
    ),
  },
];
