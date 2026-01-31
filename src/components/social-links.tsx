import { SOCIAL_LINKS } from "@/lib/constants";

const prefixMap = {
  github: "open",
  email: "mail",
} as const;

function getDisplayUrl(href: string, icon: string) {
  if (icon === "email") return href.replace("mailto:", "");
  return href.replace("https://", "");
}

export default function SocialLinks() {
  return (
    <ul className="space-y-1">
      {SOCIAL_LINKS.map(({ label, href, icon }) => (
        <li key={label}>
          <a
            href={href}
            target={icon === "email" ? undefined : "_blank"}
            rel={icon === "email" ? undefined : "noopener noreferrer"}
            className="inline-block rounded text-sm text-t-blue transition-colors hover:text-t-br-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
          >
            <span className="text-t-green">$ </span>
            {prefixMap[icon]} {getDisplayUrl(href, icon)}
          </a>
        </li>
      ))}
    </ul>
  );
}
