import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"


export const GET = async (req, { params }) => {

    const p = await params
    const bookingCollection = dbConnect(collectionNameObj.bookingCollection)
    const query = { _id: new ObjectId(p.id) }
    const singleBooking = await bookingCollection.findOne(query)


    return NextResponse.json(singleBooking)
}