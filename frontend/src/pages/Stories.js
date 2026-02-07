import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Stories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/content/story")
      .then((res) => setStories(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shiva Stories</h1>

      {stories.map((story) => (
        <div key={story._id} style={{ marginBottom: "10px" }}>
          <Link to={`/stories/${story.slug}`}>
            <button style={{ padding: "10px 15px", cursor: "pointer" }}>
              {story.title}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
