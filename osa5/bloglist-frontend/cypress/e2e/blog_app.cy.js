describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Joonas Koivu',
      username: 'Joonas',
      password: 'salis'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('Site loads and login form can be opened', function () {

    it('front page can be opened', function () {
      cy.contains('BB-B-B-Blogs for days')
    })

    it('Login form is shown', function () {
      cy.contains('Press to log in').click()
      cy.contains('Login to use the bloglist')
    })
  })

  describe('Loginform works correctly', function () {
    it('User cannot login with incorrect credentials', function () {
      cy.contains('Press to log in').click()
      cy.get('#username').type('random')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()
      cy.get('.error').contains('wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it('User can login with correct credentials', function () {
      cy.contains('Press to log in').click()
      cy.get('#username').type('Joonas')
      cy.get('#password').type('salis')
      cy.get('#loginButton').click()
      cy.contains('Logged in as Joonas')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('Press to log in').click()
      cy.get('#username').type('Joonas')
      cy.get('#password').type('salis')
      cy.get('#loginButton').click()
    })

    it('New blog can be created', function () {
      cy.contains('add new blog').click()
      cy.createBlog({
        title: 'ensimmäinen testi blogi cypressillä',
        author: 'cypress1',
        url: 'www.testi.fi/cypress1',
        likes: 0
      })
      cy.contains('ensimmäinen testi blogi cypressillä')
      cy.get('#Title')
        .contains('ensimmäinen testi blogi cypressillä')
      cy.get('#Author')
        .contains('by - cypress1')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('add new blog').click()
        cy.createBlog({
          title: 'Toinen testi blogi cypressillä',
          author: 'cypress2',
          url: 'www.testi.fi/cypress2',
          likes: 0
        })
      })
      it('it can be liked', function () {
        cy.contains('Toinen testi blogi cypressillä')
        cy.contains('View').click()
        cy.contains('Like').click()
        cy.contains('Likes: 1')
      })
      it('it can be deleted', function() {
        cy.contains('Toinen testi blogi cypressillä')
        cy.contains('View').click()
        cy.contains('Remove').click()
        cy.contains('Deleted Toinen testi blogi cypressillä')
        cy.timeout(6000)
        cy.contains('Toinen testi blogi cypressillä').should('not.exist')
      })
      it('it cannot be deleted by another user than the original creator', function() {
        cy.contains('Toinen testi blogi cypressillä')
        cy.contains('Logout').click()
        const user = {
          name: 'second user',
          username: 'kakkonen',
          password: 'kaksi'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.contains('Press to log in').click()
        cy.get('#username').type('kakkonen')
        cy.get('#password').type('kaksi')
        cy.get('#loginButton').click()

        cy.contains('Toinen testi blogi cypressillä')
        cy.contains('View').click()
        cy.contains('Remove').should('not.exist')
      })
      it('blogs are ordered by likes', function() {
        cy.createBlog({
          title: 'Kolmas testi blogi cypressillä',
          author: 'cypress3',
          url: 'www.testi.fi/cypress3',
          likes: 10
        })
        cy.createBlog({
          title: 'Neljäs testi blogi cypressillä',
          author: 'cypress4',
          url: 'www.testi.fi/cypress4',
          likes: 0
        })
        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('Kolmas testi blogi cypressillä')
          cy.wrap(blogs[1]).contains('Toinen testi blogi cypressillä')
          cy.wrap(blogs[2]).contains('Neljäs testi blogi cypressillä')
        })
        cy.get('.blog').eq(2)
          .contains('View').click()
        cy.contains('Like').click()
        cy.timeout(500)
        cy.get('.blog').eq(2)
        cy.contains('Like').click()

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('Kolmas testi blogi cypressillä')
          cy.wrap(blogs[1]).contains('Neljäs testi blogi cypressillä')
          cy.wrap(blogs[2]).contains('Toinen testi blogi cypressillä')
        })
      })

    })
  })
})
