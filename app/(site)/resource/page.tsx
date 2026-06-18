const resources = [
  {
    title: "TH Streamer Recommend",
    items: [
      { name: "Fuutime", note: "Twitch" },
      { name: "Cursedzxz", note: "Twitch / Youtube" },
      { name: "FoemanDD", note: "Soop" },
      { name: "Reverie", note: "Twitch" },
      { name: "Itzphawoak", note: "Twitch" },
    ],
  },
  {
    title: "Deep technique / Hidden Comp (On X)",
    items: [
      { name: "khymTFT" },
      { name: "ClementKChu" },
      { name: "mindful_one_" },
      { name: "orgap1" },
    ],
  },
  {
    title: "Meta Tierlist",
    items: [{ name: "TFT Academy" }, { name: "Sologesang" }],
  },
  {
    title: "Stat / Tools",
    items: [
      { name: "Tactics.tools", url: "https://tactics.tools" },
      { name: "MetaTFT", url: "https://www.metatft.com" },
      { name: "lolchess", url: "https://lolchess.gg" },
    ],
  },
];

export default function ResourcePage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Resource</h1>
      <p className="mb-8 text-muted">
        แหล่งข้อมูลที่แนะนำสำหรับผู้เล่น TFT ระดับ competitive
      </p>

      <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
        {resources.map((section) => (
          <section key={section.title} className="card-surface-static p-5">
            <h2 className="mb-4 font-bold text-accent">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.name} className="text-sm">
                  {"url" in item && item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-accent hover:underline"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span className="text-foreground">{item.name}</span>
                  )}
                  {"note" in item && item.note && (
                    <span className="ml-1 text-muted">({item.note})</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
