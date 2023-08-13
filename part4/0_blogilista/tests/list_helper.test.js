const listHelper = require('../utils/list_helper')
//4.3
test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listHelper.listWithOneBlog)
        expect(result).toBe(5)
    })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listHelper.blogs)
        expect(result).toBe(36)
    })
})