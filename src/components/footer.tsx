export default function Footer() {
  return (
    <footer className="border-t border-t-border">
      <div className="mx-auto max-w-3xl space-y-1 px-6 py-6 text-sm">
        <p>
          <span className="text-t-blue">~</span>
          <span className="text-t-green">{" $ "}</span>
          <span className="text-t-fg">
            echo &quot;&copy; {new Date().getFullYear()} 이성&quot;
          </span>
        </p>
        <p className="text-t-muted">
          &copy; {new Date().getFullYear()} 이성
        </p>
        <p>
          <span className="text-t-blue">~</span>
          <span className="text-t-green">{" $ "}</span>
          <span
            className="inline-block w-2 animate-pulse bg-t-fg motion-reduce:animate-none"
            aria-hidden="true"
          >
            &nbsp;
          </span>
        </p>
      </div>
    </footer>
  );
}
