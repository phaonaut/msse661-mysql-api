import { use, expect, should } from 'chai';
import chaiHttp from 'chai-http';

const request = use(chaiHttp).request.execute;


describe('Tasks API Service Suite', () => {
    it('should return all tasks', (done) => {
        // console.log(chai)
        request('http://localhost:3000')
        .get('/api/tasks')
        .end((err, res) => {
            expect(res.status).to.be.eql(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.not.be.eql(0);
            done();
        });
    });

    it('should return a task', (done) => {
        request('http://localhost:3000')
        .get('/api/tasks/1')
        .end((err, res) => {
            expect(res.status).to.be.eql(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('id');
            done();
        });
    });

});
