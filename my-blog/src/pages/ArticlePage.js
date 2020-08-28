import React, {useState, useEffect} from 'react';
import ArticleList from '../components/ArticleList';
import articleContent from './article-content';
import NotFoundPage from './NotFoundPage';

const ArticlePage = ({match}) => {
  const name = match.params.name;  //route params for each article
  const article = articleContent.find(article => article.name === name);

  const [articleInfo , setArticleInfo] = useState({upvotes : 0 , comments : []});

  //runs when the component runs, for fetching data and setting the state
  //runs also when the component updates
  useEffect( () => {
    const fetchData = async() => {
      // connect to backend
      const result = await fetch(`/api/articles/${name}`);  //proxy
      const body = await result.json();
      console.log(body)
      setArticleInfo(body);
    }
    fetchData();
    // setArticleInfo({upvotes : Math.ceil(Math.random() * 10)});
  }, [name]);  //update when the article changes 

  if(!article) return <NotFoundPage />

  //show other articles excluding the article we are on 
  const otherArticles = articleContent.filter(article => article.name !== name)
  return (
    <>
      <h1> {article.title}</h1>
      <p>This post has been upvoted {articleInfo.upvotes} times</p>
      {article.content.map((paragraph,key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <h3>Other Articles: </h3>
      <ArticleList articles={otherArticles} />
    </>
  )
}
  

export default ArticlePage;


// cors policy error solution : add proxy in package.json to connect to the backend localhost