import useFetch from '../hooks/useFetch';
import useLogChanges from '../hooks/useLogChanges';
import useLocalStorage from '../hooks/useLocalStorage';

export default function BeersList() {
    const [pageNumber, setPageNumber] = useLocalStorage(
        'pageNumber', // Key!
        1 // Default / initial value!
    );
    const [beers, status, error] = useFetch('https://api.punkapi.com/v2/beers?page='+pageNumber+'&per_page=16');
    useLogChanges(beers);

    return (
        <>
            <h2>Beers List (Page {pageNumber})</h2>
            {(pageNumber > 1) && <button onClick={e => {setPageNumber(pageNumber - 1)}}>Previous</button>}
            <button onClick={e => {setPageNumber(Number(pageNumber) + 1)}}>Next</button>
            <ul>
                {error && <li>{error}</li>}
                {status && <li>{status}</li>}
                {beers && beers.map(beer => <li key={beer.id}><h3>{beer.name}</h3><p>{beer.description}</p></li>)}
            </ul>
        </>
    );
}