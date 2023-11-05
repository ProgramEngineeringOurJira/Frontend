import { FC, FormEvent, memo, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSendRequest } from '../../hooks/useSendRequest';
import { paths } from '../../utils/paths';
import { AuthContext } from '../../shared/context'

const _Register: FC = () => {
  const authContext = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const submitCallback = () => {
    if (isSuccess) {
      authContext?.setIsAuth(true)
      navigate(paths.board)
    }
  }

  const { sendRequest, isError, isLoading, queryResult, isSuccess } = useSendRequest(
    submitCallback,
    'register'  
  )

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const sendObject = {
      email: email,
      password: password
    }

    sendRequest(sendObject)
  }

  return (
    <>
      {isLoading ? (
        <span>Загрузка...</span>
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={(e) => {setEmail(e.target.value)}} placeholder='Email' value={email}></input>
            <input onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' value={password}></input>
            <button type="submit">
              <span>Зарегаться!</span>
            </button>
          </form>
          {isError && (
            <span>
              {queryResult}
            </span>
          )}
        </>
      )}
    </>
  )
}

export const Register = memo(_Register)
