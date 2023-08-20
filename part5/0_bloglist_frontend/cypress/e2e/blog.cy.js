const newUser = {
  username: "arthur",
  name: "test",
  password: "asdfasdf"
}

const secondUser = {
  username: "arthur2",
  name: "test",
  password: "asdfasdf"
}

const newBlog = {
  title: "middleLikes",
  author: "testA",
  url: "testUrl",
}

const secondBlog = {
  title: "mostLikes",
  author: "testA",
  url: "testUrl",
}
const thirdBlog = {
  title: "leastLikes",
  author: "testA",
  url: "testUrl",
}

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', newUser)
    cy.request('POST', 'http://localhost:3003/api/users', secondUser)
    cy.visit('http://localhost:5173')
  })
  //5.17
  it('Login form is shown', function () {
    cy.contains('🥳 Login')
  })
  //5.18
  describe('Login', () => {
    it('succeeds with correct credentials', function () {
      cy.contains('🥳 Login')
      cy.get('#username').type('arthur')
      cy.get('#password').type(newUser.password)
      cy.get('#login-button').click()
      cy.contains('test logged in 🎉')
    })
    it('fails with wrong credentials', function () {
      cy.contains('🥳 Login')
      cy.get('#username').type('arthur')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('😔 no can do with that key, find a betterRR one (wrong username or password)')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('🥳 Login')
      cy.get('#username').type('arthur')
      cy.get('#password').type(newUser.password)
      cy.get('#login-button').click()
    })
    afterEach(() => {
      cy.get('#logout-button').click()
    })
    //5.19
    it('A blog can be created', function () {
      cy.contains('Blogs 📄 📄📄📄')
      cy.get('#createNewBlog-button').click()
      cy.get('#newBlogTitle').type(newBlog.title)
      cy.get('#newBlogAuthor').type(newBlog.author)
      cy.get('#newBlogUrl').type(newBlog.url)
      cy.get('#saveNewBlog-button').click()
      cy.contains('middleLikes by testA')
    })
    //5.20
    it('A blog can be liked and likes updates', function () {
      cy.contains('Blogs 📄 📄📄📄')
      cy.get('#createNewBlog-button').click()
      cy.get('#newBlogTitle').type(newBlog.title)
      cy.get('#newBlogAuthor').type(newBlog.author)
      cy.get('#newBlogUrl').type(newBlog.url)
      cy.get('#saveNewBlog-button').click()
      cy.contains('middleLikes by testA')
      cy.contains('📖 Open').click()
      cy.contains('👍 like').click()
      cy.contains('likes 1')
    })
    //5.21
    it('A blog can be removed', function () {
      cy.contains('Blogs 📄 📄📄📄')
      cy.get('#createNewBlog-button').click()
      cy.get('#newBlogTitle').type(newBlog.title)
      cy.get('#newBlogAuthor').type(newBlog.author)
      cy.get('#newBlogUrl').type(newBlog.url)
      cy.get('#saveNewBlog-button').click()
      cy.get('#blogs button:first').click()
      cy.get('#blogs').contains('🗑️ remove').click()
    })
    //5.22
    it('Only blog owner can remove blog', function () {
      cy.contains('Blogs 📄 📄📄📄')
      cy.get('#createNewBlog-button').click()
      cy.get('#newBlogTitle').type(newBlog.title)
      cy.get('#newBlogAuthor').type(newBlog.author)
      cy.get('#newBlogUrl').type(newBlog.url)
      cy.get('#saveNewBlog-button').click()
      cy.wait(500)
      cy.get('#logout-button').click()
      cy.contains('🥳 Login')
      cy.get('#username').type('arthur2')
      cy.get('#password').type(secondUser.password)
      cy.get('#login-button').click()
      cy.get('#blogs button:first').click()
      cy.get('#blogs').contains('🗑️ remove').should('not.exist')
    })
    //5.23
    it.only('blogs are ordered by likes', function () {
      cy.contains('Blogs 📄 📄📄📄')
      cy.get('#createNewBlog-button').click()
      cy.get('#newBlogTitle').type(newBlog.title)
      cy.get('#newBlogAuthor').type(newBlog.author)
      cy.get('#newBlogUrl').type(newBlog.url)
      cy.get('#saveNewBlog-button').click()
      cy.get('#createNewBlog-button').click()
      cy.get('#newBlogTitle').type(secondBlog.title)
      cy.get('#newBlogAuthor').type(secondBlog.author)
      cy.get('#newBlogUrl').type(secondBlog.url)
      cy.get('#saveNewBlog-button').click()
      cy.get('#createNewBlog-button').click()
      cy.get('#newBlogTitle').type(thirdBlog.title)
      cy.get('#newBlogAuthor').type(thirdBlog.author)
      cy.get('#newBlogUrl').type(thirdBlog.url)
      cy.get('#saveNewBlog-button').click()
      cy.get('#blogs div').eq(0).contains('📖 Open').click()
      for (let i = 0; i < 2; i++) {
        cy.get('#blogs div').eq(0).contains('👍 like').click()
        cy.wait(100)
      }
      cy.get('#blogs div').eq(1).contains('📖 Open').click()
      for (let i = 0; i < 3; i++) {
        cy.get('#blogs div').eq(1).contains('👍 like').click()
        cy.wait(100)
      }
      cy.get('#blogs div').eq(2).contains('📖 Open').click()
      cy.get('#blogs div').eq(2).contains('👍 like').click()
      cy.get('#blogs div').eq(0).contains('mostLikes')
      cy.get('#blogs div').eq(1).contains('middleLikes')
      cy.get('#blogs div').eq(2).contains('leastLikes')
    })
  })
})