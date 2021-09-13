import { ActiveLink } from '.'
import { render } from '@testing-library/react'

jest.mock( 'next/dist/client/router', () => {
  return {
    useRouter () {
      return {
        asPath: '/'
      }
    }
  }
} )

describe( 'ActiveLink component', () => {
  it( 'renders correctly', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>home</a>
      </ActiveLink>
    )

    expect( getByText( 'home' ) ).toBeInTheDocument()
  } )

  it( 'adds active class if the link as currently active', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>home</a>
      </ActiveLink>
    )

    expect( getByText( 'home' ) ).toHaveClass( 'active' )
  } )
} )

