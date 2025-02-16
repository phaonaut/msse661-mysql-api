import { use, expect, should } from 'chai';
import chaiHttp from 'chai-http';

const request = use(chaiHttp).request.execute;


describe('Authentication API Service Suite', () => {
    it('should POST a new user', (done) => {
        const randomNumber = Math.floor(Math.random() * 1000);
        const testUser = {
            username: 'testuser'+ randomNumber,
            password: 'testpassword',
            email: 'testuser' + randomNumber + '@example.com',
        };
        const expectedUser = {
            username: 'testuser' + randomNumber,
            email: 'testuser' + randomNumber + '@example.com',
            id: 1
        };

        request('http://localhost:3000')
           .post('/api/auth/register')
           .send(testUser)
           .end((err, res) => {
            expect(res.status).to.be.eql(200);
            expect(res.body).to.be.a('array');
            expect(res.body[0].username).to.be.eql(expectedUser.username);
            done();
           });

    });
        
    // Error response for missing information
    it('should not create new user if username is missing', (done) => {
        const errorMessage = {
                message: "Please provide all required fields."       
        };
        request('http://localhost:3000')
            .post('/api/auth/register')
            .send({ password: 'testpassword', email: 'testuser@example.com' })
            .end((err, res) => {
                expect(res.status).to.be.eql(400);
                expect(res.body).to.be.eql(errorMessage);
                done();
            });
    });
});