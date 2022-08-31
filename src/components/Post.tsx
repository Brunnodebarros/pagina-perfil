import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { FormEvent, useState } from 'react';



import { Comment } from './Comment';
import { Avatar } from './Avatar';

import styles from './Post.module.css';

/**            TIPAGEM         */

interface PostProps{
    author:{
            name: string;
            role: string;
            avatarUrl: string;
           }
    publishedAt: Date;
    content: string;
}
/*       ----------------       */

export function Post({author, publishedAt, content}: PostProps) {
    const [comments, setComments ] = useState([
        'Post muito bacana hein?!'
    ]);

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:MM'h'", {
        locale: ptBR,
    });

    const puplishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    });

    const isNewCommentEmpty = newCommentText.length === 0;


/*--------------  FUNÇÕES(Disparadas com click do usuário)   ------------------   */

    function handleCreateNewComment(event:FormEvent) /* evento de formulário  */
    {
        event.preventDefault()

       setComments([...comments, newCommentText]);
       setNewCommentText('');

       /* serve para limpar o campo de texo depois de publicar o comentário*/ 
    }

    function handleNewCommentChange(event){
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event){
        event.target.setCustomValidity('Campo obrigatório!');
    }

    function deleteComment(commentToDelete){  
        /*filter é um método jaascript que percorre cada comentário... retornando true mantem, false retira*/
        const commentsWithoutDeleteOne = comments.filter(
            comment => {
                          return comment != commentToDelete;
                        }
        );

        setComments(commentsWithoutDeleteOne);
    }
    
/**         ---------------------      */
    
    return(
        <article className = { styles.post }>
            <header>
                <div className = { styles.author}>
                    <Avatar src = { author.avatarUrl } />
                    <div className = { styles.authorInfo }>
                        <strong> { author.name }</strong>
                        <span> { author.role } </span> 
                    </div>
                </div>

                <time title = { publishedDateFormatted } dateTime = { publishedAt.toISOString() }> 
                  {puplishedDateRelativeToNow}  
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if(line.type === 'paragraph'){
                        return <p key = { line.content }>{line.content}</p>;
                    }
                    else if (line.type === 'link'){
                        return (
                            <p key = { line.content }> 
                                <a href="#"> { line.content } </a> 
                            </p>
                        )
                    }
                })}

            </div>
            
            
            <form onSubmit = { handleCreateNewComment } className = { styles.commentForm } >
                <strong> Deixe seu Feedback! </strong>

                <textarea 
                    name = "comment"
                    placeholder = "Deixe um comentário... "
                    value = { newCommentText }
                    onChange = { handleNewCommentChange }
                    onInvalid = { handleNewCommentInvalid }
                    required
                />

                <footer>
                    <button type="submit" disabled = { isNewCommentEmpty }>Publicar</button>
                </footer>
            
            </form>

            <div className={styles.commentList}>
                {comments.map( comment => {
                    return (
                        <Comment 
                            key = { comment } 
                            content = { comment } 
                            onDeleteComment = { deleteComment } /* chama a função como propriedade do componente*/
                        />
                    );
                })}

            </div>

        </article>
    );

}