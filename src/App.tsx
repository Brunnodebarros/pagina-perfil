import { Header } from './components/Header';
import { Post } from './components/Post';
import './global.css'
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar';


const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/brunnodebarros.png',
      name: 'Bruno de Barros',
      role: 'Desenvolvedor React'
    },
    
    content: [
      { type: 'paragraph', content:'Fala galeraa 👋',},
      { type: 'paragraph', content:'Acabei de subir mais um projeto no meu portifólio', },
      { type: 'link', content:'#NLW'}

    ],

      publishedAt: new Date('2022-08-12 17:20:00'),
  },
];


export function App() {

  return (
    <div>
      <Header/>

      <div className={styles.wrapper}>
       
        <Sidebar/>
        
        <main>
          {posts.map( post => {
            return (
              <Post 
                key = { post.id }
                author = { post.author }
                content = { post.content }
                publishedAt = { post.publishedAt }
              />
            )
          })}
        </main>
      </div>

    </div>
  )
}