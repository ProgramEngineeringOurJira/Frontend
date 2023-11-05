import { FC, FormEvent, memo, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSendRequest } from '../../hooks/useSendRequest';
import { paths } from '../../utils/paths';
import { AuthContext } from '../../shared/context'

const _Login: FC = () => {
  const authContext = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const submitCallback = (data: any) => {
    authContext.setIsAuth(true)
    
    if (data) {
      authContext.setAccessToken(data['access_token'])
    }

    navigate(paths.board)
  }

  const { sendRequest, isError, isLoading, queryResult, isSuccess } = useSendRequest(
    submitCallback,
    'login'  
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
              <span>Залогиниться!</span>
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

export const LoginCheck = memo(_Login)
