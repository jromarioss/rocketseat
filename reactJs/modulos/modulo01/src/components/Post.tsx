import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Comment } from './Comment'
import { Avatar } from './Avatar'

import styles from './Post.module.css'

interface Author {
  name: string
  role: string
  avatarUrl: string
}

interface Content {
  type: 'paragraph' | 'link'
  content: string
}

interface PostProps {
  author: Author,
  publishedAt: Date
  content: Content[]
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState([
    'Post muito banaca, hein?!'
  ])

  const [newCommentText, setNewCommentText] = useState('') // armazenar o texto do input

  // const publishedDateFormatted = new Intl.DateTimeFormat('pt-BR', {
  //   day: '2-digit', // o dia seja de dois dígitos
  //   month: 'long', // o mês inteiro
  //   hour: '2-digit', // hora 2 dígitos
  //   minute: '2-digit' // minutos 2 dígitos
  // }).format(publishedAt) // no final manda a data para formatar
  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR // no 3 parâmetro envia á localização
  })

  // compara a data com a data de agora
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true // com isso fica há 8 dias atrás
  })

  function handleCreateNewComment(event: FormEvent) { // evento no formulário
    event.preventDefault() // não deixa envia o formulário

    setComments([...comments, newCommentText]) // passa o novo valor, copia todos valores que já tem e adiciona um novo valor

    setNewCommentText('') // limpa o input
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) { // evento do onChange, o evento aconteceu no textarea
    event.target.setCustomValidity("")
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) { // evento de invalido
    event.target.setCustomValidity("Este campo e obrigatório...") // pg o texto do error
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    }) // retorna os comentários diferente que eu quero deletar

    setComments(commentsWithoutDeletedOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href='#'>{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          placeholder='Deixe um comentário...'
          value={newCommentText}
          onChange={handleNewCommentChange} /* Monitora cada vez que tem uma mudação no input*/
          onInvalid={handleNewCommentInvalid} // é chamada sempre que o html idêntica q realizou um submit do formulário só q o txt era vazio
          required
        />

        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment} // manda a função como propriedade
            />
          )
        })}
      </div>
    </article>
  )
}