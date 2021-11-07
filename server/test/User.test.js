const chai = require('chai');
const expect = chai.expect;
const url = `http://localhost:4000/`;
const request = require('supertest')(url);

describe('GraphQL', () => {
    it('Returns books with name = amila', (done) => {
        request.post('/graphql')
        .send({ query: '{ book(name: "amila") { name } }'})
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            res.body.user.should.have.property('name')
            res.body.user.should.have.property('genre')
            done();
        })
    })
});