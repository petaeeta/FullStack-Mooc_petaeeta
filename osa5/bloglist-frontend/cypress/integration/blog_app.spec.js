describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        username: "ExampleUserName",
        name: "ExampleName",
        password: "salasana"
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Log in to application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
          const user = {
            username: "ExampleUserName",
            password: "salasana"
          }
          cy.login(user)

          cy.contains('blogs')
          cy.contains('ExampleName logged in')

        })
    
        it('fails with wrong credentials', function() {
          cy.get('#username').type('BadName')
          cy.get('#password').type('Bad')
          cy.get('#login-button').click()

          cy.contains('Login failed:')
        })
      })

      describe('When logged in', function() {
        beforeEach(function() {
          const user = {
            username: "ExampleUserName",
            password: "salasana"
          }
          cy.login(user)
        })
    
        it('A blog can be created', function() {
          const post = {
            url: 'ExampleUrl',
            title: 'ExampleTitle',
            author: 'ExampleAuthor'
          }
          cy.createPost(post)
          cy.contains('view')
          cy.contains('ExampleTitle')
          cy.contains('ExampleAuthor')
          cy.get('html').should('not.contain', 'ExampleUserName')
          cy.get('html').should('not.contain', 'ExampleUrl')
        })

        it('A blog can be opened', function() {
          const post = {
            url: 'ExampleUrl',
            title: 'ExampleTitle',
            author: 'ExampleAuthor'
          }
          cy.createPost(post)
          cy.contains('view')
          cy.contains('ExampleTitle')
          cy.contains('ExampleAuthor')
          cy.get('html').should('not.contain', 'ExampleUserName')
          cy.get('html').should('not.contain', 'ExampleUrl')
          cy.contains('ExampleTitle').parent().find('button').click()
          cy.contains('ExampleUserName')
          cy.contains('ExampleUrl')
          cy.contains('likes 0')
          cy.contains('like')
        })

        it('A blog can be liked', function() {
          const post = {
            url: 'ExampleUrl',
            title: 'ExampleTitle',
            author: 'ExampleAuthor'
          }
          cy.createPost(post)
          cy.contains('ExampleTitle').parent().find('button').click()
          cy.contains('likes 0')
          cy.contains('like').parent().find('button').click()
          cy.contains('likes 1')
          cy.contains('like').parent().find('button').click()
          cy.contains('likes 2')
        })

        it('A blog can be removed', function() {
          const post = {
            url: 'ExampleUrl',
            title: 'ExampleTitle',
            author: 'ExampleAuthor'
          }
          cy.createPost(post)
          cy.contains('ExampleTitle').parent().find('button').click()
          cy.contains('Remove').parent().find('button').click()
          cy.contains('Post was removed successfully!')
          cy.get('html').should('not.contain', 'ExampleTitle')
          cy.get('html').should('not.contain', 'ExampleAuthor')
        })

        it.only('blogs are ordered correctly', function() {
          const post = {
            url: 'ExampleUrl',
            title: 'ExampleTitle',
            author: 'ExampleAuthor'
          }
          const post2 = {
            url: 'ExampleUrl2',
            title: 'ExampleTitle2',
            author: 'ExampleAuthor2'
          }
          const post3 = {
            url: 'ExampleUrl3',
            title: 'ExampleTitle3',
            author: 'ExampleAuthor3'
          }
          cy.createPost(post)
          cy.createPost(post2)
          cy.createPost(post3)
          cy.get('ExampleTitle').then( (props) => {console.log(props)})
        })
      })
  })