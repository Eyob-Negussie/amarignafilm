const request = require('supertest');
const connection = require('../../startup/db')();
const genre = require('../../controllers/genre');
let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../app'); });
    afterEach(() => {server.close();});

    describe('GET /', () => {
        it('should return all genres', async () => {
            const testGenre ={
                genre: 'test genre1'
            };
            await genre.addGenre(testGenre);

            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.some(g => g.genre === 'test genre1'));
        });
    });

    describe('GET /', () => {
        it('should return a genre if valid id is passed', async () => {
            const testGenre ={
                genre: 'test genre1'
            };
            const id = await genre.addGenre(testGenre);

            const res = await request(server).get('/api/genres/' + id);

            expect(res.status).toBe(200);
            expect(res.body).toBe(id);
        });
    });
});