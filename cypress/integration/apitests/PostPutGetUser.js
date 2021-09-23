/// <reference types ="cypress" />

const dataJson = require("../../fixtures/updateUser.json")

describe("Post - Put - Get request", () =>{

    let authorization = "Bearer token"

    it("create user - update - user - validate user test", () =>{

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
            let randomNumberUpdated = Math.floor(Math.random()*1000000)
            let emailUpdated = dataJson.email + randomNumberUpdated + "@testing.com"
            
            cy.request({ 
                method: "PUT",
                url: "https://gorest.co.in/public/v1/users/" + userID,
                headers: {
                    "authorization": authorization
                },
                body:{
                    "name": dataJson.name,
                    "gender": dataJson.gender,
                    "email": emailUpdated,
                    "status": dataJson.status
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.data.id).to.eq(userID)
                expect(res.body.data.email).to.eq(emailUpdated)
                expect(res.body.data.name).to.eq(dataJson.name)
                expect(res.body.data.gender).to.eq(dataJson.gender)
                expect(res.body.data.status).to.eq(dataJson.status)
            }).then((res)=>{
                
                cy.request({
                    method: "GET",
                url: "https://gorest.co.in/public/v1/users/" + userID,
                headers: {
                    "authorization": authorization
                },

                }).then((res) =>{
                    expect(res.status).to.eq(200)
                    expect(res.body.data.id).to.eq(userID)
                    expect(res.body.data.email).to.eq(emailUpdated)
                    expect(res.body.data.name).to.eq(dataJson.name)
                    expect(res.body.data.gender).to.eq(dataJson.gender)
                    expect(res.body.data.status).to.eq(dataJson.status)

                })
            })

            })
        })
    })
})
