import Head from 'next/head';
import Link from 'next/link';
import homeStyles from '/styles/Home.module.css';
import type { GetStaticProps } from 'next'
import {getSortedPostsData} from '@/lib/posts'

const Home = ({allPostsData}: {
  allPostsData : {
    date:string
    title:string
    id: string
  }[]
})=> {
  return (
    <div className={homeStyles.container}>
      <Head>
          <title>Kim Eun Sol</title>
      </Head>
      <section className='homeStyles.headingMd'>
        <p>[Kim Eun Sol Introduction]</p>
        <p>(this is web site)</p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostsData.map(({id, title, date}) =>
         <li className={homeStyles.listItem} key={id}>
         <Link href={`/posts/${id}`}>
           {title}
         </Link>
           <br />
           <small className={homeStyles.lightText}>
             {date}
           </small>
       </li>
          )}
        </ul>
      </section>
    </div>
  )
}
export default Home;

export const getStaticProps : GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props : {
      allPostsData
    }
  }
}