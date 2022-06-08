process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
const { Item } = require("./helpers")

let items = require("./fakeDb");

let testItem = new Item("test item", 2.50);
let secondTestItem = new Item("second test item", 3.50)

beforeEach(() => {
    items.push(testItem);
});

afterEach(() => {
    items.length = 0;
});

describe("GET /items", () => {
    test("Should return a list of items", async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({Items: [testItem]});
    });
});

describe("POST /items", ()=> {
    test("given appropriate data, new item should be added to fakeDb", async () => {
        const res = await request(app).post('/items').send({name: secondTestItem.name, price: secondTestItem.price})

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({added: secondTestItem})
    })
})