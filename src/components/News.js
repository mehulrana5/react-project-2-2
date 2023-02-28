import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import No_img from '../no_img.jpg';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalresults, settotalResults] = useState(0);

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line
  },[]);



  const fetchArticles = async () => {
    setLoading(true);
    const cacheKey = `${props.country}-${props.category}-page-${page}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      // console.log('present in local storage');
      const parsedData = JSON.parse(cachedData);
      setArticles(articles.concat(parsedData.articles));
      settotalResults(parsedData.totalResults);
      setPage(page + 1);
      setLoading(false);
      return;
    }
    // console.log('not present in local storage');
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setPage(page + 1);
    setLoading(false);
    localStorage.setItem(cacheKey, JSON.stringify(parsedData));
  };

  const fetchMoreData = async () => {
    const cacheKey = `${props.country}-${props.category}-page-${page}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      // console.log('present in local storage');
      const parsedData = JSON.parse(cachedData);
      setArticles(articles.concat(parsedData.articles));
      setPage(page + 1);
      setLoading(false);
      settotalResults(parsedData.totalResults);
      return;
    }
    // console.log('not present in local storage');
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
    setLoading(false);
    setPage(page + 1);
    localStorage.setItem(cacheKey, JSON.stringify(parsedData));
  };





  return (
      <>
        <div className="container-fluid">
          <h1 className="text-center" style={{marginTop:"70px"}}>Top Headlines</h1>
          <h2 className="text-center">({props.category})</h2>
          { loading && <Spinner />}
            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={articles.length < totalresults}
              loader={<Spinner/>} 
            >
              <div className="container">
          <div className='row'>
              {!loading && articles && articles.map((e) => {
                return <div className="col mx-2" key={e.url}>
                  <NewsItem 
                    title={e.title ? e.title.slice(0, 40) : ""} 
                    desc={e.description ? e.description.slice(0, 100) : ""} 
                    imgUrl={e.urlToImage ? e.urlToImage : No_img} 
                    newsUrl={e.url} 
                    author={e.author} 
                    date={e.publishedAt} 
                    src={e.source.id}
                  />
                </div>
              })}
          </div>
          </div>
            </InfiniteScroll>
        </div>
      </>
    )
  }
News.defaultProps = {
  country: "in",
  pageSize: 12,
  category: "general",
  page:1
};
export default News
