import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";


export const DELETE = async (req, { params }) => {
    const bookingCollection = dbConnect(collectionNameObj.bookingCollection)
    const p = await params
    const query = { _id: new ObjectId(p.id) }
    const session = await getServerSession(authOptions)
    const currentBooking = await bookingCollection.findOne(query)

    const isOwnerOk = session?.user?.email == currentBooking.email

    if (isOwnerOk) {
        const deleteResponse = await bookingCollection.deleteOne(query)
        revalidatePath("/my-bookings")
        return NextResponse.json(deleteResponse)
    } else {
        return NextResponse.json({ success: false, message: "Forbidden Action" }, {status:401})
    }
}

export const GET = async (req, { params }) => {
    const p = await params;
    const serviceCollection = dbConnect(collectionNameObj.serviceCollection);
    const data = await serviceCollection.findOne({ _id: new ObjectId(p.id) });
    return NextResponse.json(data)
}

