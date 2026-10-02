import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

export default function NavBar() {
  const [data, setData] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadTags = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes/tags');
        if (!response.ok) {
          throw new Error('Failed to fetch recipe tags');
        }

        const result = (await response.json()) as string[];
        setData(result);
      } catch (error) {
        console.error('Error fetching recipe tags:', error);
      }
    };

    void loadTags();
  }, []);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchValue.trim()) {
      navigate(`/category/${searchValue.toLowerCase()}`);
      setSearchValue('');
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <span className="brand-mark" aria-hidden="true">食</span>
          <span>
            Flavor<span className="brand-accent">Find</span>
          </span>
        </Link>

        <div className="d-flex content">
          <div className="position-relative">
            <button className="c-btn nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Categories
            </button>
            <ul className="dropdown-menu menu">
              {data.map((tag) => (
                <li key={tag}>
                  <Link to={`/category/${tag}`} className="dropdown-item">
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <form role="search" className="d-flex justify-content-between" onSubmit={handleSearch}>
            <input
              className="search"
              type="search"
              name="search"
              placeholder="Search recipes or categories"
              aria-label="Search recipes or categories"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <button type="submit" className="search-icon" aria-label="Search">
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}