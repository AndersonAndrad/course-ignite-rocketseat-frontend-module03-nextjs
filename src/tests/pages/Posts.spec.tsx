import Post, { getStaticProps } from '../../pages/posts'
import { render, screen } from '@testing-library/react'

import { getPrismicClient } from '../../services/prismic'
import { mocked } from 'ts-jest/utils'

jest.mock( '../../services/prismic.ts' )

const posts = [
  {
    slug: 'my new post',
    title: 'My new post',
    excerpt: 'This is my new post',
    updatedAt: '2020-01-01',
  }
]

describe( 'Posts page', () => {
  it( 'renders correctly', () => {
    render( <Post posts={posts} /> )

    expect( screen.getByText( 'My new post' ) ).toBeInTheDocument()
  } )

  it( 'load initial data ', async () => {
    const getPrismicClientMocked = mocked( getPrismicClient )

    getPrismicClientMocked.mockReturnValueOnce( {
      query: jest.fn().mockResolvedValue( {
        results: [
          {
            uid: 'my new post',
            data: {
              title: [
                { type: 'heading', text: 'My new post' }
              ],
              content: [
                { type: 'paragraph', text: 'This is my new post' }
              ],
            },
            last_publication_date: '2020-01-01',
          }
        ]
      } )
    } as any )

    const response = await getStaticProps( {} )

    expect( response ).toEqual(
      expect.objectContaining( {
        props: {
          posts: [
            {
              slug: 'my new post',
              title: 'My new post',
              excerpt: 'This is my new post',
              updatedAt: '31 de dezembro de 2019',
            }
          ]
        }
      } )
    )
  } )
} )