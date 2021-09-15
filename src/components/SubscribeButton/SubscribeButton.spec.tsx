import { fireEvent, render, screen } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/client'

import { SubscribeButton } from '.'
import { mocked } from 'ts-jest/utils'
import { useRouter } from 'next/router'

jest.mock( 'next-auth/client' )
jest.mock( 'next/router' )

describe( 'Subscribe button component', () => {
  it( 'renders correctly ', () => {
    const useSessionMocked = mocked( useSession )

    useSessionMocked.mockReturnValueOnce( [null, false] )

    render( <SubscribeButton /> )

    expect( screen.getByText( 'Subscribe now' ) ).toBeInTheDocument()
  } )

  it( 'redirects user to sing in when not authenticated', () => {
    const useSessionMocked = mocked( useSession )

    useSessionMocked.mockReturnValueOnce( [null, false] )

    const singInMocked = mocked( signIn )

    render( <SubscribeButton /> )

    const subscribeButton = screen.getByText( 'Subscribe now' )

    fireEvent.click( subscribeButton )

    expect( singInMocked ).toHaveBeenCalled()
  } )

  it( 'redirects to posts when user already has a subscription', () => {
    const userRouterMocked = mocked( useRouter )
    const userSessionMocked = mocked( useSession )
    const pushMock = jest.fn()

    userSessionMocked.mockReturnValueOnce( [{
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      },
      expires: 'fake-expires',
      activeSubscription: 'fake-active-subscription'
    },
      false
    ] )

    userRouterMocked.mockReturnValueOnce( {
      push: pushMock
    } as any )

    render( <SubscribeButton /> )

    const subscribeButton = screen.getByText( 'Subscribe now' )

    fireEvent.click( subscribeButton )

    expect( pushMock ).toHaveBeenCalled()
  } )
} )
