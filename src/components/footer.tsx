import SocialLinks from "@/components/social-links";

export default function Footer() {
  return (
    <footer className="border-t border-ctp-surface-0">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-8">
        <SocialLinks />
        <p className="text-sm text-ctp-subtext-0">
          &copy; {new Date().getFullYear()} 이성. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
