import { useEffect, useState } from "react";
import axios from "axios";
import { API_V1 } from "../services/apiBase";

export default function StoryReader({ slug, onBack }) {
  const [story, setStory] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_V1}/content/story/${slug}`)
      .then((res) => setStory(res.data.data))
      .catch(console.error);
  }, [slug]);

  if (!story) return <p style={{ padding: 20 }}>Loading story...</p>;

  return (
    <div style={{ padding: 20, lineHeight: 1.8 }}>
      <button onClick={onBack} style={{ marginBottom: 15 }}>
        ← Back
      </button>

      <h1>{story.title}</h1>

      <p style={{ whiteSpace: "pre-line" }}>
        {story.detailedText}
      </p>

      {story.spiritualMeaning && (
        <>
          <hr />
          <h3>Spiritual Meaning</h3>
          <p>{story.spiritualMeaning}</p>
        </>
      )}
    </div>
  );
}
