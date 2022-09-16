import React from 'react'
import { useCounter, useFetch } from '../hooks/index';
import { LoadingQuote, Quote } from '../03-examples';


export const Layout = () => {

  const { counter, increment } = useCounter(1);

  let { data, isLoading, hasError } = useFetch(`https://www.breakingbadapi.com/api/quotes/${counter}`);

  const { author, quote } = !!data && data[0];


  return (
    <div>

      <h1>Breaking Bad Quotes</h1>
      <hr />

      {

        isLoading
          ? <LoadingQuote />
          : <Quote author={author} quote={quote} />
      }


      <button
        className='btn btn-primary'
        onClick={() => increment(1)}
        disabled={isLoading}
      >
        Next quote
      </button>

    </div>
  )
}
