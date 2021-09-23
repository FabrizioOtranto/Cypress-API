/// <reference types ="cypress" />

describe("post user request", () =>{

    let authorization = "Bearer token"
    

    it("Create user and delete it", () =>{

        cy.fixture("createUser").then((data) =>{
        let randomNumber = Math.floor(Math.random()*1000000)
        let email = data.email + randomNumber + "@testing.com"
        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v1/users",
            headers: {
                "authorization": authorization
            },
            body: {
                "name": data.name,
                "gender": data.gender,
                "email": email,
                "status": data.status
            }

        }).then((res)=>{
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property("email",email)
            expect(res.body.data).has.property("name",data.name)
            expect(res.body.data).has.property("gender",data.gender)
            expect(res.body.data).has.property("status",data.status)
        
        }).then((res) =>{
            const userID = res.body.data.id
            cy.log("user is is " + userID)
            
            cy.request({ 
                method: "Delete",
                url: "https://gorest.co.in/public/v1/users/" + userID,
                headers: {
                    "authorization": authorization
                },
            }).then((res) =>{
                expect(res.status).to.eq(204)
            })

            })
        })
    })
})
