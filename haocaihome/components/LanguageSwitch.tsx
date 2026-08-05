import Link from "next/link";

type LanguageSwitchProps = {
  current: "zh" | "en";
  zhHref: string;
  enHref: string;
};

export default function LanguageSwitch({ current, zhHref, enHref }: LanguageSwitchProps) {
  const linkClass = "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors";
  const activeClass = "bg-arcana-gold text-white";
  const inactiveClass = "text-arcana-gray hover:bg-white hover:text-arcana-cream";

  return (
    <div className="inline-flex items-center rounded-full border border-white/80 bg-white/70 p-1 shadow-sm backdrop-blur-xl" aria-label="Language">
      <Link href={zhHref} hrefLang="zh-CN" className={`${linkClass} ${current === "zh" ? activeClass : inactiveClass}`}>
        中文
      </Link>
      <Link href={enHref} hrefLang="en" className={`${linkClass} ${current === "en" ? activeClass : inactiveClass}`}>
        EN
      </Link>
    </div>
  );
}
