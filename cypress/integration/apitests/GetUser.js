/// <reference types ="cypress" />


describe("get api users tests", () =>{

    let authorization = "Bearer token"

it("get users test", ()=>{

    cy.request({
        method: "GET",
        url: "https://gorest.co.in/public/v1/users",
        headers: {
            "authorization": authorization
        },
    }).then((res)=>{
        expect(res.status).to.eq(200)
        expect(res.body.meta.pagination.pages).to.eq(331)
    })

})

it("get user by ID test", ()=>{

    cy.request({
        method: "GET",
        url: "https://gorest.co.in/public/v1/users/1855",
        headers: {
            "authorization": authorization
        },
    }).then((res)=>{
        expect(res.status).to.eq(200)
        expect(res.body.data.id).to.eq(1855)
        expect(res.body.data.email).to.eq("abcdddd.ramakrishna@15ce.com")
        expect(res.body.data.name).to.eq("Fabián")
    })

})

})
