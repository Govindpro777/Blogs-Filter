import { createContext, useState, useEffect } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const navigate = useNavigate();

  // Fetch Blog Data
  const fetchBlogPosts = async (page = 1, tag = null, category) => {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    if (tag) {
      url += `&tag=${tag}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.posts || data.posts.length === 0) {
        throw new Error("Something went wrong");
      }
      console.log("API Response:", data);
      setPage(data.page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("Error fetching blog posts:", error);
      setPage(1);
      setPosts([]);
      setTotalPages(null);
    }
    setLoading(false);
  };

  // Handle search functionality
  useEffect(() => {
    if (searchQuery) {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts]);

  // Handle page change
  const handlerPageChange = (page) => {
    navigate({ search: `?page=${page}` });
    setPage(page);
  };
  

  const value = {
    posts,
    filteredPosts,
    setPosts,
    loading,
    setLoading,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlerPageChange,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

