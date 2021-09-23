/// <reference types="Cypress" />

describe("Qauth feateure apis", () =>{
    let accessToken = ""
    let userId = ""

    before('generate the token', () =>{
        cy.request({
            method: "POST",
            url: "http://coop.apps.symfonycasts.com/token",
            form: true,
            body:{
                "client_id" :"CypressAppFabrizio",
                "client_secret": "fa934eb46235314b258532828247bae5",
                "grant_type": "client_credentials",
            }
        }).then((res) =>{
            cy.log(res.body.access_token);
            accessToken = "Bearer " + res.body.access_token;

            cy.request({
                method: "GET",
                url:"http://coop.apps.symfonycasts.com/api/me",
                headers:{
                    "authorization": accessToken
                }
            }).then((res) =>{
                userId = res.body.id
        })
        })
    })
        
        it("request chikens-feed",() =>{
                cy.request({
                    method: "POST",
                    url: `http://coop.apps.symfonycasts.com/api/${userId}/chickens-feed`,
                    headers:{
                        "authorization": accessToken
                    }
                }).then((res) =>{
                    cy.log(JSON.stringify(res))
                    expect(res.status).to.eq(200)
                })

            })

        it("requst eggs-collect",() =>{
            cy.request({
                method: "POST",
                url: `http://coop.apps.symfonycasts.com/api/${userId}/eggs-collect`,
                headers:{
                    "authorization": accessToken
                }
            }).then((res) =>{
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(200)
            })

        })

        it("Request toiletseat-down",() =>{
            cy.request({
                method: "POST",
                url: `http://coop.apps.symfonycasts.com/api/${userId}/toiletseat-down`,
                headers:{
                    "authorization": accessToken
                }
            }).then((res) =>{
                cy.log(JSON.stringify(res))
                expect(res.status).to.eq(200)
            })

        })
        })


        
    


