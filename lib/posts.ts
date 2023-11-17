//node.js의 파일시스템 모듈 fs, 경로 작업을 위한 모듈 path, 그리고 gray-matter 라이브러리를 임폴트한다.
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remarkHtml from 'remark-html';
import { remark } from 'remark';

//현재작업 디렉토리와 post하위 디렉토리 경로를 결합하여 상수에저장
const postsDirectory = path.join(process.cwd(),'posts')

//현재 작업 디렉토리의 경로를 콘솔에 출력
console.log('process.cwd()', process.cwd());

//포스트 파일들이 위치할 디렉토리의 경로를 콘솔에 출력
console.log('postsDirectory', postsDirectory);

export function getSortedPostsData() {
//postDirectory 디렉토리 내의 파일 이름들을 동기적으로 읽어와 fileNames배열저장
   const fileNames = fs.readdirSync(postsDirectory)
   console.log('fileNames', fileNames)
//fileNames배열의 각 파일 이름에 대해 반복하여 각파일 데이터를 포함하는 객체를 생성하는 map함수 호출
   const allPostsData =fileNames.map(fileName =>{

//파일이름에서 md확장자를 제거하여 포스트의 id 생성
    const id = fileName.replace(/\.md$/, '')

//포스트 파일의 전체 경로 생성
    const fullPath = path.join(postsDirectory,fileName)
//해당경로 파일 내용을 utf-8로 인코딩
    const fileContents = fs.readFileSync(fullPath,'utf8')
//읽어온 파일에내용에서 프론트 매터를 파싱 (데이터로변경)
    const matterResult = matter(fileContents)

//각 포스트의 ID와 파싱된 메타데이터를 포함하는 객체 반환
    return {
        id,
            ...matterResult.data as {date: string; title: string}
    }
   })

//allPostData배열을 정렬하는 함수호출
   return allPostsData.sort((a,b)=>{
//각 포스트를 date필드 기준 정렬
       if (a.date < b.date) {
           return 1
       }else{
           return -1
       }
   })

}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileNames => {
        return {
            params: {
                id: fileNames.replace(/\.md$/,'' )
            }
        }
    })
}

export async function getPostData(id:string) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    const processedContent = await remark()
        .use(remarkHtml)
        .process(matterResult.content)
    
    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        ...(matterResult.data as {date: string; title: string})
    }
}