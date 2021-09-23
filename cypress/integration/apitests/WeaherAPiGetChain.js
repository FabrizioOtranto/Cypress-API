/// <reference types ="cypress" />

it("get wheater infromation for all cities", () =>{
    cy.request({
        method: "GET",
        url: "https://www.metaweather.com/api/location/search/?query=Am"
    }).then((res) =>{
      const location = res.body
      return location

    }).then((location) =>{

        for (let i=0; i<location.length; i++){
        cy.request({
            method: "GET",
            url: "https://www.metaweather.com/api/location/search/?query="+location[i].title
        }).then((res) =>{
            expect(res.body[0].title).to.eq(location[i].title)
        })

    }
        
    })
})

it("get wheater infromation for cities", () =>{
    cy.request({
        method: "GET",
        url: "https://www.metaweather.com/api/location/search/?query=san"
    }).then((res) =>{
        expect(res.status).to.eq(200)
        expect(res.body[0].title).to.eq("San Francisco")

    }).then((res) =>{
        const city = res.body[0].title
        cy.request({
            method: "GET",
            url: "https://www.metaweather.com/api/location/search/?query="+city
        }).then((res) =>{
            expect(res.body[0].title).to.eq("San Francisco")
        })
        
    })
})