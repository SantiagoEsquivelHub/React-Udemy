import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components'
import queryString from 'query-string';
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);

  const heroes = getHeroesByName(q);

  const showSearch = (q.length === 0);
  const showError = (q.length > 0) && (heroes.length === 0);

  const { formState, onInputChange, handleReset, searchText } = useForm({
    searchText: q
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();

    if (searchText.trim().length <= 1) return;

    navigate(`?q=${searchText}`);
    console.log({ q })
  }

  return (
    <div>

      <h4>Search</h4>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching...</h4>
          <hr />
          <form onSubmit={onSearchSubmit} aria-label="form">
            <input
              type="text"
              placeholder='Search a heroe'
              className='form-control mb-2'
              name='searchText'
              autoComplete='off'
              value={searchText}
              onChange={onInputChange}
            />

            <button className='btn btn-outline-primary'>
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div className="alert alert-primary animate__fadeIn animate__animated" style={{ display: showSearch ? '' : 'none' }} aria-label="search_heroe">
            Search a heroe
          </div>

          <div className="alert alert-danger animate__fadeIn animate__animated" style={{ display: showError ? '' : 'none' }} aria-label="error_search_heroe">
            There's no heroe with <b>{q}</b>
          </div>


          {
            heroes.map(heroe => (
              <HeroCard key={heroe.id} {...heroe} />
            ))
          }

        </div>

      </div>
    </div >
  )
}
