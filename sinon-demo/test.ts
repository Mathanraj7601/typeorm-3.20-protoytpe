import {
    DataSource,
    getTestConnection,
    teardownTestConnection,
} from "../MyProject/src/data-source"

import { User } from "./event";
import { expect } from 'chai';
import sinon, { SinonSpy } from "sinon";

describe("prototype - user test", () => {
    let db: DataSource,
        user: User,
        spy: SinonSpy;

    before(async () => {
        try {
            console.log("before");
            db = await getTestConnection();
            user = new User(db);
            // console.log(user);
        } catch (error) {
            console.error("Error during before hook:", error);
            throw error;
        }
    })

    beforeEach(() => {
        console.log("before each")
    })

    after(async () => {
        try {
            console.log("after");
            await teardownTestConnection();
        } catch (error) {
            console.error("Error during after hook:", error);
            throw error;
        }
    })

    afterEach(() => {
        console.log("after each");
        if (spy) {
            spy.restore();
        }
    })

    it("test - add user", async () => {
        const userData = {
            "id" : 1,
            "firstName" : "Sivarajan",
            "lastName" : "P",
            "age" : 23,
            "ages" : 23,
            "agess" : 23,
        };

        spy = sinon.spy(user,"add")

        try {
            const { status }: any = await user.add(userData);
            expect(spy.calledOnceWith(userData)).to.be.true;
        } catch (error) {
            console.error("Error during test - add user:", error);
            throw error;
        } finally {
            spy.restore();
        }
    });

    it("test - edit user", async () => {
        const userData = {
            "id" : 1,
            "firstName" : "Sivarajan g",
            "lastName" : "P",
            "age" : 23,
            "ages" : 23,
            "agess" : 23,
        };

        spy = sinon.spy(user,"edit")

        try {
            const { status }: any = await user.edit(userData);
            expect(spy.calledOnceWith(userData)).to.be.true;
        } catch (error) {
            console.error("Error during test - add user:", error);
            throw error;
        } finally {
            spy.restore();
        }
    });
});