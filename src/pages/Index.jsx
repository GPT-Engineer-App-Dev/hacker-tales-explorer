import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          "https://hn.algolia.com/api/v1/search?tags=front_page"
        );
        setStories(response.data.hits);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Hacker News Top Stories</h1>
        <input
          type="text"
          placeholder="Search stories..."
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <Skeleton className="h-10 w-full mb-4" count={10} />
        ) : (
          <ul>
            {filteredStories.map((story) => (
              <li key={story.objectID} className="mb-4 p-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold">{story.title}</h2>
                <p className="text-gray-600">Upvotes: {story.points}</p>
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Index;
