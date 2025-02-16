import { use, expect, should } from 'chai';
import chaiHttp from 'chai-http';

const request = use(chaiHttp).request.execute;

// const request = use(chaiHttp).request
// console.log(request)

const token = 'eyJSampleToken';

describe('User API Service Suite', () => {
    
    it('Should return a user', (done) => {
        const expected = [
            {
                id: 1,
                username: 'test',
                email: 'test@test.com'
            }
        ];
        request('http://localhost:3000')
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
            expect(res.status).to.be.eql(200);
            expect(res.body).to.be.a('array');
            expect(res.body).to.be.eql(expected);
            done();
        });
    });

    it.skip('Should update a user', (done) => {
        const updatedUser = {
                id: 1,
                username: 'test',
                email: 'test@test.com'
        };
        request('http://localhost:3000')
        .put('/api/users/me')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser)
        .end((err, res) => {
            expect(res.status).to.be.eql(200);
            done();
        });
    });

});
