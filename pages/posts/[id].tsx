import { getAllPostIds, getPostData } from '@/lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react'
import homeStyles from '/styles/Home.module.css';
import Head from 'next/head';
import PostStyle from '/styles/Post.module.css';

 const Post= ({postData}:{
    postData: {
        title:string
        date:string
        contentHtml:string
    }
 })=> {
  return (
    <div className={PostStyle.container}>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={homeStyles.headingXl}>{postData.title}</h1>
            <div className={homeStyles.lightText}>
                {postData.date}
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </div>
)
}

export default Post

export const getStaticPaths : GetStaticPaths = async () =>{
    const paths = getAllPostIds();
    
    //[{params:{id:'pre-rendering'}. {params:{id:'ssg-ssr'}}]
    return {
      paths,
      fallback: false
    }
  }

  export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id as string)

    return {
      props: {
        postData
      }
    }
}