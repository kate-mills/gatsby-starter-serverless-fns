const API_KEY = process.env.AIRTABLE_API
const BASE_ID = process.env.AIRTABLE_BASE_ID
const TABLE_ID = process.env.AIRTABLE_TABLE_ID

var Airtable = require("airtable")
var base = new Airtable({ apiKey: API_KEY }).base(BASE_ID)

exports.handler = async (event, context, cb) => {
  base("Spas")
    .select({
      maxRecords: 3,
      view: "Grid view",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          console.log("Retrieved", record.get("email"))
          console.log("Retrieved", record.get("name"))
        })
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          console.error(err)
          return
        }
      }
    )

  return { statusCode: 200, body: "Airtable Select 3" }
}
