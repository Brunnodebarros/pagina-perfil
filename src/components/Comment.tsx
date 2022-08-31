import styles from './Comment.module.css';
import myimage from '../img/myimage.jpg';
import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from './Avatar';
import { useState } from 'react';


export function Comment({ content, onDeleteComment }) {

    const [likeCount, setLikeCount] = useState(0);

    function handleDeleteComment(){
        onDeleteComment(content);
    }

    function handleLikeComment(){
        setLikeCount(likeCount + 1);
    }

    return(
        <div className={ styles.comment }> 
            <Avatar hasBorder = { false } src = "https://github.com/brunnodebarros.png"/>
        
            <div className = { styles.commentBox }>
                <div className = { styles.commentContent }>
                    <header>
                        
                        <div className = {styles.authorAndTime}>
                            <strong>Bruno de Barros</strong>
                            <time title = "03 de Julho às 09:17h" dateTime = "2022-08-03"> Cerca de 1h atrás </time>
                        </div>
                        
                        <button onClick = {handleDeleteComment} title = 'Deletar comentário'>
                            <Trash size = {24} />
                        </button>

                    </header>

                    <p>{content}</p>

                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>

            </div>


        </div>

    )
}