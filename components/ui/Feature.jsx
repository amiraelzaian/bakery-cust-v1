

export default function Feature({ icon, title, description }) {
  return (
    <div className="text-center flex flex-col items-center gap-2">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold">{title}</h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 opacity-80">
        {description}
      </p>
    </div>
  );
}