import { render, screen } from '@testing-library/react'

import { SingInButton } from '.'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'

jest.mock( 'next-auth/client' )

describe( 'Sing In button component', () => {
  it( 'renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked( useSession )

    useSessionMocked.mockReturnValueOnce( [null, false] )

    render( <SingInButton /> )

    expect( screen.getByText( 'Sing in with GitHub' ) ).toBeInTheDocument()
  } )

  it( 'renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked( useSession )

    useSessionMocked.mockReturnValueOnce( [{
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      }, expires: 'fake-expires'
    }, false] )

    render( <SingInButton /> )

    expect( screen.getByText( 'John Doe' ) ).toBeInTheDocument()
  } )
} )