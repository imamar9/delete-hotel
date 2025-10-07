const express = require("express")
const app = express()

app.use(express.json())

const { initializeDB } = require("./db/db.connect")
const Hotel = require("./models/hotel.models")

initializeDB()


async function readAllHotels() {
    try {
        const hotels = await Hotel.find()
        return hotels
    } catch (error) {
        console.log(error)
    }
}

app.get("/hotels", async (req, res) => {
    const hotels = await readAllHotels()
    try 
        {
            if (hotels.length != 0) {
                res.json(hotels)
        } else {
            res.status(404).json({error: "No data found."})
        }
    } catch (error) {
        res.status(500).json("Error reading hotels data...")
    }
})


async function deleteHotel(hotelId) {
  const hotel = await Hotel.findByIdAndDelete(hotelId)
  return hotel
}

app.delete("/hotels/:hotelId", async (req, res) => {
    try {
        const hotelById = await deleteHotel(req.params.hotelId)
        res.status(200).json({message: "Hotel deleted successfully", hotel:hotelById})
    } catch (error) {
        res.status(500).send("Error deleting hotel...")
    }
})



app.get("/hotels/directory/:phoneNumber", async (req, res) => {
    try {
        const hotels = await readHotelByPhoneNumber(req.params.phoneNumber)
        if (hotels) {
            res.json(hotels)
        } else {
            res.status(404).send({error: "No data found"})
        }
    } catch (error) {
        res.status(500).send({error: "Error fetching hotels data..."})
    }
})

const PORT=3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})