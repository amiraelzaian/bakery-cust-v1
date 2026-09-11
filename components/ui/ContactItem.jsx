export default function ContactItem({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full bg-primary/10 p-3 text-primary">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}