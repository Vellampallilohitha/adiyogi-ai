import { useEffect, useState } from "react";
import { fetchContentBySlug } from "../../services/content.api";

export default function JyotirlingaReader({ slug, onBack }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchContentBySlug("jyotirlinga", slug).then(setData);
  }, [slug]);

  if (!data) return <p style={{ padding: 20 }}>Loading…</p>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={onBack}>← Back</button>

      <h1>{data.title}</h1>

      <p style={{ opacity: 0.8 }}>{data.meaning}</p>

      <p style={{ marginTop: 20, lineHeight: 1.8 }}>
        <p style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
  {data.detailedText}
</p>

      </p>
    </div>
  );
}
