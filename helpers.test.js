process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
const { Item } = require("./helpers");

describe("Test Item class construction", () => {
    test("making test item", () => {
        let testItem = new Item("test item", 1.50);

        expect(testItem.name).toEqual("test item");
        expect(testItem.price).toEqual(1.50);
    })
})