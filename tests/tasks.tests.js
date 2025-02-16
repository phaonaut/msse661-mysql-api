import { use, expect, should } from 'chai';
import chaiHttp from 'chai-http';

// console.log("tasks")
const request = use(chaiHttp).request.execute;

// const request = use(chaiHttp).request
// console.log(request)

describe('Tasks API Service Suite', () => {
    it('should return all tasks', (done) => {
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

    it('create a task', (done) => {
        const task = {
            description: 'test',
            completed: false
        };
        request('http://localhost:3000')
        .post('/api/tasks')
        .send(task)
        .end((err, res) => {
            expect(res.status).to.be.eql(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('id').to.be.a('number');
            expect(res.body).to.have.property('description').to.be.eql(task.description);
            done();
        });
    });

});
