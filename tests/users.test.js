const request = require('supertest')
const app = require('../app')


describe('Users', () => {
    it('Should return all the users', () => {
        request(app)
            .get('/users')
            .expect(200)
            .then(res => {
                expect(res.body.success).toBe(true);
                expect.arrayContaining(res.body.payload);
            });
    })


    describe('Find User by Id', () => {
        it('Should return user', () => {
            request(app)
                .get('/users/1')
                .expect(200)
                .then(res => {
                    expect(res.body.success).toBe(true);
                    expect(res.body.payload.length).toBe(1);
                    expect(res.body.payload[0].id).toBe(1);
                });
        })

        it('Should return message user not found', () => {
            request(app)
                .get('/users/9')
                .expect(200)
                .then(res => {
                    expect(res.body.success).toBe(false);
                    expect.stringContaining(res.body.message);
                    expect(res.body.message).toBe("No user found User Id:9");
                });
        })
    })

    it('Should return users count', () => {
        request(app)
            .get('/users/count')
            .expect(200)
            .then(res => {
                expect(res.body.success).toBe(true);
                expect.arrayContaining(res.body.payload);
                expect(res.body.payload.user_count);
            });
    })
})
