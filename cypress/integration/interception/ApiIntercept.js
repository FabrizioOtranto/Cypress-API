/// <reference types ="cypress" />

describe("Intercetp with cypress examples", () =>{

    it.skip("test api with simple intercept", () =>{
        cy.visit("https://jsonplaceholder.typicode.com/")

        cy.intercept({
            path: "/posts"

        }).as("posts")

        cy.get('table:nth-of-type(1) a[href="/posts"]').click()
        cy.wait("@posts").then(inter =>{
            cy.log(JSON.stringify(inter))
            console.log(JSON.stringify(inter))
            expect(inter.response.body).to.have.length(100)

        })
    })
    it("mocking  intercept with static response", () =>{

        cy.visit("https://jsonplaceholder.typicode.com/")
        cy.intercept("GET", "/posts", {totalposts: 5, name: "Fabrizio"}).as("posts")
        cy.get('table:nth-of-type(1) a[href="/posts"]').click()
        cy.wait("@posts")
    })

    it("mocking  with inercept test with dynamic fixture", () =>{

        cy.visit("https://jsonplaceholder.typicode.com/")
        cy.intercept("GET", "/posts", {fixture: "createrUser.json"}).as("posts")
        cy.get('table:nth-of-type(1) a[href="/posts"]').click()
        cy.wait("@posts")
    })
})