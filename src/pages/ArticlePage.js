import React, { useEffect, useState } from 'react';
import articleContent from './../data/article-content';
import ArticlesList from '../components/ArticlesList';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import UpvotesSection from '../components/UpvotesSection';
import PageNotFound from './PageNotFound';

const ArticlePage = ({ match }) => {
    const articleName = match.params.name;
    const article = articleContent.find(article => article.name === articleName);

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${articleName}`);
            const resBody = await result.json();

            setArticleInfo(resBody);
        }
        fetchData();
    }, [articleName]);

    if (!article) return <PageNotFound />

    const otherArticles = articleContent.filter(article => article.name !== articleName);

    return (
        <>
            <h1>{article.title}</h1>
            {article.content.map((paragraph, key) => (
                <p key={key}>{paragraph}</p>
            ))}
            <UpvotesSection articleName={articleInfo.name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
            <CommentsList comments={articleInfo.comments} />
            <AddCommentForm articleName={articleInfo.name} setArticleInfo={setArticleInfo} />
            <h3>Related Articles</h3>
            <ArticlesList articles={otherArticles} />
        </>
    );
}

export default ArticlePage;