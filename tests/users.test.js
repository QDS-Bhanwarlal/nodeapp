const request = require('supertest')
const app = require('../app')

const path = "localhost:3000";

describe('Users', () => {
    it('Should return all the users', (done) => {
        request(path)
            .get('/users')
            .expect(200)
            .then(res => {
                expect(res.body.success).toBe(true);
                expect.arrayContaining(res.body.payload);
                done();
            });
    })


    describe('Find User by Id', () => {
        it('Should return user', (done) => {
            request(path)
                .get('/users/1')
                .expect(200)
                .then(res => {
                    expect(res.body.success).toBe(true);
                    expect(res.body.payload.length).toBe(1);
                    expect(res.body.payload[0].id).toBe(1);
                    done();
                });
        })

        it('Should return message user not found', (done) => {
            request(path)
                .get('/users/9')
                .expect(200)
                .then(res => {
                    expect(res.body.success).toBe(false);
                    expect.stringContaining(res.body.message);
                    expect(res.body.message).toBe("No user found User Id:9");
                    done();
                });
        })
    })

    it('Should return users count', (done) => {
        request(path)
            .get('/users/count')
            .expect(200)
            .then(res => {
                expect(res.body.success).toBe(true);
                expect.arrayContaining(res.body.payload);
                expect(res.body.payload.user_count);
                done();
            });
    })
})
