/// <reference types ="cypress" />

describe("post user request", () =>{

    let authorization = "Bearer token"
    let randomNumber = Math.floor(Math.random()*1000000)
    
    it("create user test", () =>{

        cy.fixture("createUser").then((data) =>{
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
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property("email",email)
            expect(res.body.data).has.property("name",data.name)
            expect(res.body.data).has.property("gender",data.gender)
            expect(res.body.data).has.property("status",data.status)
        
        }).then((res) =>{
            const userID = res.body.data.id
            cy.log("user is is " + userID)
            
            cy.request({ 
                method: "GET",
                url: "https://gorest.co.in/public/v1/users/" + userID,
                headers: {
                    "authorization": authorization
                },
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.data.id).to.eq(userID)
                expect(res.body.data.email).to.eq(email)
                expect(res.body.data.name).to.eq(data.name)
                expect(res.body.data.gender).to.eq(data.gender)
                expect(res.body.data.status).to.eq(data.status)
            })

            })
        })
    })
})
